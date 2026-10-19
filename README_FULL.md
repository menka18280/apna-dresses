Apna Dresses — Project README

This file explains the project structure and step-by-step instructions to modify and extend the site.

Files
- index.html: Home page with site title and main call link.
- women.html, men.html, kids.html: Category pages. Each product is an <article class="product"> containing:
  - <img class="product-img">: product image (SVG or photo)
  - <h3>: product title
  - description paragraph
  - <p class="price">: price
  - Call link: <a href="tel:+91..."> (click-to-call on mobile)
  - WhatsApp button: <a class="btn whatsapp" data-name="..."> (opens wa.me link)
- styles.css: All styling; modify colors, spacing, grid here.
- script.js: Core behaviors:
  - Category filter buttons show/hide products by data-category.
  - Defines const whatsappNumber = '919708952009' (update to change WA target).
  - Builds prefilled wa.me links for each product (uses data-name) and injects a floating WA button.
- products.json: Example product data. Currently not used to render pages (pages are static), but can be used if you convert pages to dynamic rendering.
- *.svg: placeholder product images.

How to make frequent changes

1) Change the phone number (click-to-call)
- Edit each page (index.html, women.html, men.html, kids.html).
- Find instances of href="tel:+91..." and the visible +91 ... text and replace both.
- Save and preview locally.

2) Change WhatsApp number
- Open script.js and update the line: const whatsappNumber = '919708952009';
  Use international format without plus, e.g. '919812345678'.
- Save and refresh the page — WhatsApp buttons will use the new number.

3) Add or modify a product (manual static method)
- Add image to project folder (e.g., new_product.jpg).
- Open the appropriate HTML page and copy an existing <article class="product"> block.
- Update attributes and content:
  - data-category="shirt" (set filter category)
  - <img src="new_product.jpg" alt="Product Name">
  - <h3>Product Name</h3>
  - description text
  - <p class="price">₹999</p>
  - Call link: <a href="tel:+919708952009">+91 97089 52009</a>
  - WhatsApp button: <a class="btn whatsapp" data-name="Product Name" href="#">WhatsApp</a>
- Save and test.

4) Make product list dynamic (recommended for many products)
- Move product entries into products.json in a consistent schema.
- Modify script.js to fetch products.json, generate the DOM for products, and attach event handlers (filters & WA links).
- Benefit: change only products.json + images; no HTML edits required.

5) Replace SVG placeholders with photos
- Optimize images (resize to ~800px width, compress to 100–300KB).
- Replace <img src="...svg"> references with new filenames.

Local preview
- From the project folder run: python -m http.server 8000
- Open http://localhost:8000 on desktop or phone (same network) to test.

Publish to GitHub Pages
- Ensure repo has gh-pages branch with site files (already prepared).
- Push changes: git add -A; git commit -m "..."; git push origin gh-pages
- GitHub Pages will serve: https://YOURUSER.github.io/apna-dresses/

Custom domain
- Add a CNAME file containing your domain (e.g., apnadresses.com) and push.
- Configure DNS at your registrar: for apex add GitHub Pages A records; for www add a CNAME to YOURUSER.github.io.

Help & next steps (I can do for you)
- Convert static pages to render from products.json (I can implement).
- Add an order form (Formspree/Netlify Forms) to collect customer info.
- Replace placeholders with real photos and optimize them.

If you want, I can now convert the pages to dynamic rendering from products.json so future updates only require editing that JSON and uploading images. Say "convert to dynamic" to proceed.