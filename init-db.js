<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CyberDev | Portfolio</title>
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

  <!-- NAVBAR -->
  <header>
    <div class="logo">CyberDev</div>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#shop">Shop Now</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- HERO -->
  <section class="hero" id="home">
    <div class="hero-text">
      <h4>Hello, I'm</h4>
      <h1>Gamer <span>and Developer</span></h1>
      <p>
        Building digital experiences that merge creativity with technology.
        Specializing in modern web development and cybersecurity systems.
      </p>
      <a href="#contact" class="btn">Let's Connect</a>
    </div>
    <div class="hero-image">
      <div class="img-wrap">
        <img src="/images/profile.jpg" alt="Profile photo">
      </div>
    </div>
  </section>

  <!-- SHOP -->
  <section id="shop">
    <h2 class="section-title">Shop <span>Now</span></h2>
    <div class="projects-grid">

      <% products.forEach(function(product) { %>
        <div class="project-card">
          <img src="<%= product.image %>" alt="<%= product.name %>">
          <div class="project-info">
            <h3><%= product.name %></h3>
            <p><%= product.description %></p>
            <p class="price">₦<%= product.price %></p>
            <a href="https://wa.me/<%= settings.whatsapp %>?text=Hi, I'm interested in <%= encodeURIComponent(product.name) %>" target="_blank">Buy Now &rarr;</a>
          </div>
        </div>
      <% }); %>

    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <h2 class="section-title">Get In <span>Touch</span></h2>
    <div class="contact-content">
      <p>Have a question or want to order? Message me directly on WhatsApp.</p>
      <a href="https://wa.me/<%= settings.whatsapp %>" target="_blank" class="btn whatsapp-btn">
        Chat on WhatsApp: 0901 685 9242
      </a>

      <div class="social-row">
        <a href="<%= settings.tiktok %>" target="_blank" class="social-btn tiktok-btn">TikTok</a>
        <a href="<%= settings.youtube %>" target="_blank" class="social-btn youtube-btn">YouTube</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    &copy; 2026 CyberDev. All Rights Reserved.
    <br>
    <a href="/admin/login" class="admin-link">Admin Login</a>
  </footer>

</body>
</html>
