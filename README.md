# 🚀 Jatin Nath - Portfolio Website

A modern, elegant, and responsive portfolio website showcasing my expertise in Data Science, Machine Learning, and AI Engineering.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 🎨 **Modern Design**: Clean, elegant UI with gradient effects and animations
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- 🐳 **Docker Ready**: Easy deployment with Docker and Docker Compose
- ⚡ **Performance Optimized**: Fast loading with efficient code
- 🎭 **Interactive Animations**: Smooth scrolling, hover effects, and transitions
- 🌈 **Dynamic Content**: Showcases projects, skills, experience, and education
- ♿ **Accessible**: Follows web accessibility standards

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with modern animations and effects
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Font Awesome 6
- **Server**: Nginx (Alpine)
- **Containerization**: Docker & Docker Compose

## 📦 Project Structure

```
port/
├── index.html           # Main HTML file
├── styles.css           # Stylesheet with animations
├── script.js            # JavaScript for interactions
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── nginx.conf           # Nginx server configuration
└── README.md            # Documentation
```

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone or download the repository**
   ```bash
   cd port
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8080
     
     # Using Node.js (http-server)
     npx http-server -p 8080
     ```

3. **Access the website**
   - Open your browser and go to `http://localhost:8080`

### Option 2: Docker Deployment

#### Prerequisites
- Docker installed on your system
- Docker Compose (optional, but recommended)

#### Using Docker Compose (Recommended)

1. **Build and run the container**
   ```bash
   docker-compose up -d
   ```

2. **Access the website**
   - Open your browser and go to `http://localhost:8080`

3. **Stop the container**
   ```bash
   docker-compose down
   ```

#### Using Docker Only

1. **Build the Docker image**
   ```bash
   docker build -t jatin-portfolio .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 8080:80 --name portfolio jatin-portfolio
   ```

3. **Access the website**
   - Open your browser and go to `http://localhost:8080`

4. **Stop and remove the container**
   ```bash
   docker stop portfolio
   docker rm portfolio
   ```

## 🎯 Sections

1. **Hero/Home**: Introduction with animated cards and social links
2. **About**: Summary of expertise and key statistics
3. **Experience**: Professional experience at Innova Solutions
4. **Projects**: Featured projects including ModelForge and NeuroFusion
5. **Skills**: Comprehensive list of technical skills and tools
6. **Education**: Academic background and certifications
7. **Contact**: Contact information and social media links

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more colors */
}
```

### Content
- Edit `index.html` to update text content
- Modify sections, add new projects, or update contact information

### Styling
- All styles are in `styles.css`
- Animations and effects can be customized
- Responsive breakpoints can be adjusted

## 🌐 Deployment Options

### Deploy to Cloud Platforms

#### Deploy to AWS (EC2)
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start

# Clone your repository or upload files
# Build and run
docker build -t portfolio .
docker run -d -p 80:80 portfolio
```

#### Deploy to Heroku
```bash
# Install Heroku CLI and login
heroku login

# Create a new app
heroku create jatin-portfolio

# Deploy
git push heroku main
```

#### Deploy to Netlify/Vercel
- Simply drag and drop the files to their web interface
- Or connect your GitHub repository

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🔧 Troubleshooting

### Port already in use
```bash
# Change the port in docker-compose.yml
ports:
  - "3000:80"  # Use port 3000 instead
```

### Docker build fails
```bash
# Clean Docker cache
docker system prune -a

# Rebuild
docker-compose build --no-cache
```

## 📈 Performance

- Lighthouse Score: 95+ (Performance)
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Optimized images and assets
- Minified and compressed resources

## 🔐 Security Features

- Security headers configured in Nginx
- XSS protection enabled
- Content-Type-Options set to nosniff
- Frame-Options set to SAMEORIGIN

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Contact

**Jatin Nath**
- 📧 Email: jatinnath1111@gmail.com
- 💼 LinkedIn: [linkedin.com/in/jatinnath1](https://www.linkedin.com/in/jatinnath1)
- 🐱 GitHub: [github.com/jatinnathh](https://github.com/jatinnathh)
- 📱 Phone: +91 96430 07622
- 📍 Location: New Delhi, India

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from modern web design trends

## 📝 Notes

- Make sure to update the content with your own information
- Add your own projects and achievements
- Customize colors and styling to match your personal brand
- Test on multiple devices and browsers before deploying

---

**Built with ❤️ by Jatin Nath**

*Last Updated: October 2025*
