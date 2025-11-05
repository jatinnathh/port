// blocked_fw_opt.cpp
// Optimized Blocked (Tiled) Floyd-Warshall with OpenMP
// Compile: g++ -O3 -march=native -fopenmp blocked_fw_opt.cpp -o blocked_fw_opt

#include <bits/stdc++.h>
#include <omp.h>
using namespace std;

const int INF = 1e9;

// Access helper for flat array
inline int &A(int *dist, int n, int i, int j) {
    return dist[i * n + j];
}

// Sequential Floyd-Warshall for baseline comparison
void floyd_sequential(int *dist, int n) {
    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i) {
            int dik = A(dist, n, i, k);
            if (dik == INF) continue;
            for (int j = 0; j < n; ++j) {
                int dkj = A(dist, n, k, j);
                if (dkj == INF) continue;
                int &dij = A(dist, n, i, j);
                int nd = dik + dkj;
                if (nd < dij) dij = nd;
            }
        }
}

// Process diagonal block B[m,m]
void update_diag(int *dist, int n, int Bsize, int m) {
    int k0 = m * Bsize;
    int k1 = min(n, k0 + Bsize);
    for (int k = k0; k < k1; ++k)
        for (int i = k0; i < k1; ++i) {
            int dik = A(dist, n, i, k);
            if (dik == INF) continue;
            for (int j = k0; j < k1; ++j) {
                int dkj = A(dist, n, k, j);
                if (dkj == INF) continue;
                int &dij = A(dist, n, i, j);
                int nd = dik + dkj;
                if (nd < dij) dij = nd;
            }
        }
}

// Update blocks in row: block(m, jb) for jb != m
void update_row_blocks(int *dist, int n, int Bsize, int m, int jb) {
    int k0 = m * Bsize;
    int k1 = min(n, k0 + Bsize);
    int i0 = k0;
    int i1 = k1;
    int j0 = jb * Bsize;
    int j1 = min(n, j0 + Bsize);

    for (int k = k0; k < k1; ++k)
        for (int i = i0; i < i1; ++i) {
            int dik = A(dist, n, i, k);
            if (dik == INF) continue;
            for (int j = j0; j < j1; ++j) {
                int dkj = A(dist, n, k, j);
                if (dkj == INF) continue;
                int &dij = A(dist, n, i, j);
                int nd = dik + dkj;
                if (nd < dij) dij = nd;
            }
        }
}

// Update blocks in column: block(ib, m) for ib != m
void update_col_blocks(int *dist, int n, int Bsize, int ib, int m) {
    int k0 = m * Bsize;
    int k1 = min(n, k0 + Bsize);
    int i0 = ib * Bsize;
    int i1 = min(n, i0 + Bsize);
    int j0 = k0;
    int j1 = k1;

    for (int k = k0; k < k1; ++k)
        for (int i = i0; i < i1; ++i) {
            int dik = A(dist, n, i, k);
            if (dik == INF) continue;
            for (int j = j0; j < j1; ++j) {
                int dkj = A(dist, n, k, j);
                if (dkj == INF) continue;
                int &dij = A(dist, n, i, j);
                int nd = dik + dkj;
                if (nd < dij) dij = nd;
            }
        }
}

// Update remaining blocks: block(ib, jb) for ib != m && jb != m
void update_peripheral(int *dist, int n, int Bsize, int ib, int jb, int m) {
    int k0 = m * Bsize;
    int k1 = min(n, k0 + Bsize);
    int i0 = ib * Bsize;
    int i1 = min(n, i0 + Bsize);
    int j0 = jb * Bsize;
    int j1 = min(n, j0 + Bsize);

    for (int k = k0; k < k1; ++k)
        for (int i = i0; i < i1; ++i) {
            int dik = A(dist, n, i, k);
            if (dik == INF) continue;
            for (int j = j0; j < j1; ++j) {
                int dkj = A(dist, n, k, j);
                if (dkj == INF) continue;
                int &dij = A(dist, n, i, j);
                int nd = dik + dkj;
                if (nd < dij) dij = nd;
            }
        }
}

// The optimized blocked FW using single parallel region and block-phase ordering
void blocked_floyd_warshall_omp(int *dist, int n, int Bsize) {
    int M = (n + Bsize - 1) / Bsize;

    #pragma omp parallel
    {
        for (int m = 0; m < M; ++m) {
            // Phase 1: diagonal block processed by single thread
            #pragma omp single nowait
            update_diag(dist, n, Bsize, m);

            #pragma omp barrier

            // Phase 2: update row blocks (m, jb) and column blocks (ib, m)
            // We do row and column updates in two independent for-loops executed by threads.
            #pragma omp for schedule(static)
            for (int jb = 0; jb < M; ++jb) {
                if (jb == m) continue;
                update_row_blocks(dist, n, Bsize, m, jb);
            }

            #pragma omp for schedule(static)
            for (int ib = 0; ib < M; ++ib) {
                if (ib == m) continue;
                update_col_blocks(dist, n, Bsize, ib, m);
            }

            #pragma omp barrier

            // Phase 3: peripheral blocks (ib, jb) where ib != m && jb != m
            #pragma omp for collapse(2) schedule(static)
            for (int ib = 0; ib < M; ++ib) {
                for (int jb = 0; jb < M; ++jb) {
                    if (ib == m || jb == m) continue;
                    update_peripheral(dist, n, Bsize, ib, jb, m);
                }
            }

            #pragma omp barrier
        } // end for m
    } // end parallel
}

// Utility: deep copy flat matrix
void copy_matrix(int *dst, const int *src, int n) {
    memcpy(dst, src, sizeof(int) * n * n);
}

// Generate random test matrix (contiguous)
int *generate_matrix_flat(int n, unsigned seed = 42) {
    srand(seed);
    int mat = (int) malloc(sizeof(int) * n * n);
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            if (i == j) mat[i*n + j] = 0;
            else {
                int r = rand() % 100;
                mat[i*n + j] = (r < 10) ? INF : (rand() % 20 + 1); // ~10% INF
            }
        }
    }
    return mat;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Sizes to test
    vector<int> sizes = {500, 1000, 1500};
    // Try B = 32, 48, 64 — typical good values; choose 64 as default
    vector<int> blockCandidates = {32, 48, 64};

    // Use environment or set threads
    int threads = omp_get_max_threads();
    omp_set_num_threads(threads);
    cout << "Threads: " << threads << "\n";
    cout << "INF = " << INF << "\n";

    for (int n : sizes) {
        cout << "\n==== N = " << n << " ====\n";

        // Generate base matrix
        int *base = generate_matrix_flat(n, 1234);

        // Sequential baseline
        int seqMat = (int) malloc(sizeof(int) * n * n);
        copy_matrix(seqMat, base, n);

        double t0 = omp_get_wtime();
        floyd_sequential(seqMat, n);
        double t_seq = omp_get_wtime() - t0;
        cout << "Sequential time: " << fixed << setprecision(3) << t_seq << " s\n";

        // Try different block sizes and pick best
        double best_time = 1e300;
        int best_B = blockCandidates[0];

        for (int B : blockCandidates) {
            if (B > n) continue;
            int work = (int) malloc(sizeof(int) * n * n);
            copy_matrix(work, base, n);

            double t1 = omp_get_wtime();
            blocked_floyd_warshall_omp(work, n, B);
            double t_block = omp_get_wtime() - t1;

            cout << "  Block size " << setw(3) << B << " -> " << t_block << " s\n";

            if (t_block < best_time) {
                best_time = t_block;
                best_B = B;
            }
            free(work);
        }

        cout << "Best blocked time: " << best_time << " s  (B = " << best_B << ")\n";
        cout << "Speedup (seq / best_blocked) = " << (t_seq / best_time) << "x\n";

        free(seqMat);
        free(base);
    }

    return 0;
}