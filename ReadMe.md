## student informatoin
Name: Dakalo Junior
Surname: Netswera
student number: ST10516159
CODE: WEBE2050

## Webside discription
When doing research, I realized that there’s a problem in my local community, residence have been completing about the poor pots they have, led to the creation of the heart of the kitchen this business was created to meet required services to satisfy the needs by providing high quality pots.

## Website goals and objectives 
Increase online sales and websites traffic:
To measure success (KPIs) monitor engagement metrics like time on site and product page
views. These metrics will help evaluate the effectiveness of strategies to boost online sales. 

## Features
in my navigation bar theres home, abouts, products, enquiries and contact.
Homepage:
Eye catching banner showcasing feature pots and photos with strong call to action (buy now).
About us
This is my storytelling page (background story) showcasing brand value, quality of pots and
customer trust.
Contact page:
This is the place where customers find ways to get in touch, using phone numbers, email.
Products/services page:
This where I explain my products in full(pots) listing with high quality images, specs, pricing and
call to action (“add to chart”, “learn more”). 

## Timeline and milestone
Business plan: 3 days
Coding: 7 days
Lunch: 10 days

## Structure 
WEBEDEV
| |  |
| |  |_ _home
| |  |_ _about us
| |  |_ _products
| |  |_ _enquiriers
| |  |_ _contact
| |  
| |_ _pot1.jpeg
| |_ _pot2.jpeg
| |_ _pot3.jpeg
| |_ _pot4.jpeg
| |_ _pot5.jpeg
| |_ _pot6.jpeg
|
|_ _index.html
|__README.md
## Changelog
18/04/2026
- included comments
- and even the footer
17/04/2026
- instolled pictures
16/04/2026 
- instolled the navigation bar
- included contact and about us
15/04/2026
- instolled home, enquiries and contact
20/05/2026
-	html, A logo made up of a round image of pot1.jpeg
-	html, The brand name DAKALO next to the image
-	html, The tagline Pots. underneath the brand name
-	html, All three sitting together on the left side of the navigation bar
-	html, The logo links back to the home page when clicked
- css, The navigation bar was made into a row so the logo sits on the left and the links sit on the right
-	css, The logo image was made round with a terracotta coloured border
-	css, The brand name was styled in a serif font in cream colour
-	css, The tagline was styled small in terracotta colour in uppercase letters
22/05/2026
- html,	All 5 pages — added <link rel="stylesheet" href="style.css"> in <head>
- html,	All 5 pages — consistent navigation bar with all 5 page links
- html,	All 5 pages — footer with copyright symbol 
- html,	index.html — hero section wrapped in <div class="hero"> with heading span for colour accent, hero image wrapped in <a href="products.html">, pot2 image wrapped in <a href="products.html">, promo banner image wrapped in <a href="products.html">, feature list changed to <ul class="feature-list">, content block div added, promo banner div added
-	about.html — page title given class="page-title", about intro wrapped in <div class="about-intro">, added a content block with pot1 image linking to products page, values wrapped in <div class="values-grid">, each value in <div class="value-card">
23/05/2026
- 	products.html — products wrapped in <div class="products-grid">, each product in <div class="product-card">, image inside each card wrapped in <a href="enquiry.html">, price changed from <strong> to <span class="product-price">, added <a href="enquiry.html" class="btn-enquire">Enquire Now</a> under each product
-	contact.html — page title given class="page-title", layout wrapped in <div class="contact-layout">, phone number wrapped in <a href="tel:+27608972588">, email wrapped in <a href="mailto:dakalonetswera03@gmail.com">, map image added linking to Google Maps, form fields wrapped in <div class="form-group">, action="#" method="get" added to form
-	enquiry.html — page title given class="page-title", all form fields wrapped in <div class="form-group">, paired fields wrapped in <div class="form-row">, table restyled with new class structure, action="#" method="get" added to form, removed all JavaScript that was originally in this page
- removed the articles 
26/05/2026
- css,	Google Fonts imported — Playfair Display (headings) and DM Sans (body text)
-	CSS variables for all colours, fonts, spacing, shadows and border radius
- css,	Full reset using * { box-sizing: border-box; margin: 0; padding: 0 }
- css,	Sticky navigation bar with dark charcoal background
- css,	Nav link hover effect with animated underline sliding in from left
- css,	Hero section with dark gradient background and radial glow effect
- css,	All heading styles (h1–h5) with font sizes, colours and spacing
- css,	Paragraph max-width and line height for readability
- css,	Horizontal rule styling
- css, 	Page container with max-width and padding
- css,	Page title with terracotta underline accent
- css,	Content block — two column grid for image + text side by side
- css,	Feature list with terracotta arrow bullets and bottom borders
- css,	Promo banner — dark background card with image and text side by side
27/05/2026
- css,	About intro max-width constraint
- css,	Values grid — three equal columns
- css,	Value card with top terracotta border, hover lift effect and shadow
- css,	Products grid — three equal columns
- css,	Product card with hover lift, image, body padding and price styling
- css,	Contact layout — two column grid for info and form side by side
- css,	Form styles — labels, inputs, selects and textareas with focus highlight in terracotta
28/05/2026
- css,	Form row — two column grid for side by side fields
- css,	Form group — stacked label and input
- css,	Submit button and anchor button styles with hover darkening and lift
- css, 	Enquire Now button style (.btn-enquire) as a styled anchor tag
- css,	Table styles — dark header, alternating row colours, border bottom on rows
- css,	Success message green styling
- css,	Footer dark background with muted text
- css,	Full responsive breakpoint at 768px — all grids collapse to single column
03/06/2026
- index.js, Active nav link highlighting — looks at the current page's URL and highlights the matching link in the nav bar (cream text + terracotta underline), so the visitor can see which page they're on.
- index.js, Scroll-reveal animations — elements like product cards, value cards, content blocks, the promo banner, and tables start invisible and slightly lower on the page, then fade/slide into view as the visitor scrolls down to them. Uses IntersectionObserver so it only triggers once per element, when it enters the viewport.
- index.js, Lightbox (image popup viewer) — clicking any product, content, hero, or promo image opens it full-screen in a dark overlay with a caption and a close button. Closes by clicking outside the image, clicking ✕, or pressing Escape.
- index.js, Hero image carousel (newly added) — cycles automatically through three cookware photos every 4.5 seconds. Includes prev/next arrow buttons and clickable dots to jump to a specific slide, and pauses auto-sliding while the mouse is hovering over it.
- index.html,The old hero section had a single static image wrapped in .hero-img-wrap linking to products.html.
- index.html, Replaced with <div class="hero-carousel" id="hero-carousel"> containing:

Three <a href="products.html"> links, each wrapping one <img> (pot4.jpeg, pot5.jpeg, pot6.jpeg), with descriptive alt text.
Two <button> elements for prev/next, with aria-label attributes for accessibility.
A <div class="carousel-dots"> with three <button> dots, each carrying a data-index attribute the JS uses to know which slide to jump to.
05/06/2026
- about.js, Animated stat counters — three numbers (Founded year, Happy Customers, Product Lines) count up from 0 to their final value with an easing effect, triggered once when the visitor scrolls down to that section (IntersectionObserver again).
- about.html, Added one new block: <div class="stats-row" id="stats-row"> inserted between the "Who We Are" content block and the values grid.
- about.html, Inside it, three <div class="stat-item"> blocks, each with a <span class="stat-number" data-target="...">0</span> (the data-target is what the JS counts up to) and a <span class="stat-label">.
08/06/2026
- contact.js, Real-time field validation — name, email, and message fields are checked as soon as the visitor clicks away from them (on "blur"), showing a red error message underneath if something's wrong (e.g. name too short, invalid email format, message too short).
- contact.js, Submit validation + shake effect — on form submit, all fields are re-checked; if anything's invalid, the submit button shakes and the errors stay visible.
- contact.js, Mailto submission — once everything passes validation, it builds a pre-filled email (to your Gmail address, with subject and a formatted body containing the name/email/message) and opens the visitor's email client.
- contact.js, Success message — after a successful submit, a green confirmation message appears below the form and disappears automatically after 6 seconds.
11/06/2026
- enquiry.js, Collapsible business hours table (accordion) — clicking the "Business Hours" heading expands/collapses the hours table, with a small arrow icon that rotates to show open/closed state.
- enquiry.js, Character counter — below the message textarea, shows "0 / 500" and updates live as the visitor types, turning a warning color near the 500-character limit, and hard-stops further typing past 500.
- enquiry.js, Full form validation — every field (first name, last name, email, phone, product category, quantity, budget, message) has its own validation rule, checked both on blur and on submit, with error messages shown directly under each field.
- enquiry.js, Price estimate calculator — after a successful submit, it calculates a rough price estimate based on the selected budget range, quantity, and whether a "premium" product type was chosen (ceramic, custom, wholesale get a markup)
- enquiry.js, Dynamic response card — builds and inserts a styled confirmation panel showing the customer's name, expected response time, the price estimate, and a "what happens next" checklist — all generated dynamically in JS rather than being static HTML.
14/06/2026
- product.js, Dynamic product rendering — the three product cards aren't hardcoded in the HTML; they're stored as a JS array of objects (name, price, image, category, tag) and built into HTML on page load.
- product.js, Search bar — a search input is injected above the product grid; typing filters the products live by name, description, or category.
- product.js, Sort dropdown — lets the visitor sort products by price (low→high or high→low), or leave it in default order.
- product.js, Live product count — shows how many products currently match the search/filter (e.g. "3 products", "0 products").
- product.js, Lightbox integration — clicking a product image opens it in the same lightbox viewer defined in index.JS.
16/06/2026
- style.css, 1 Hero carousel styles 
.hero-carousel — wraps the whole slider, rounded corners, drop shadow, max-width 560px, centered.
.carousel-track — fixed-height container (340px) that holds all three slides stacked on top of each other.
.carousel-slide — each slide is positioned to fill the track but starts invisible; only the .active one fades into view (0.6s fade transition).
.carousel-arrow (.prev / .next) — circular semi-transparent buttons on the left/right edges, turn terracotta on hover.
.carousel-dots / .carousel-dot — small dots at the bottom center; the active one turns terracotta and scales up slightly.
- style.css, 2 Stats row styles (new, About page)
.stats-row — 3-column grid, centered text, same spacing rhythm as your other grids.
.stat-number — large serif (Playfair Display) terracotta number.
.stat-label — small uppercase grey label underneath (e.g. "Founded", "Happy Customers").
17/06/2026
- style.css, 3 Responsive breakpoint additions (inside your existing @media (max-width: 768px) block)
.carousel-track shrinks to 240px height on mobile.
.carousel-arrow buttons shrink slightly (34px instead of 40px).
.stats-row added to the list of grids that collapse to a single column on small screens.
- style.css, 4 Bug fix (no visual change, just a repair)
While editing, I briefly broke the .value-card rule (accidentally deleted its opening line). This was caught and fixed before delivery, so your value cards still look and behave exactly as before — just flagging it since it technically happened during this session.
18/06/2026
- new files
- robots.txt — plain text, tells search engines they can crawl everything and points them to the sitemap.
- sitemap.xml — lists all 5 pages (index, about, products, contact, enquiry) with priority and update-frequency hints for search engines.
## Reference
Amazon, 2026. Pots and pans set Nonstick 16 PCS, Algetic induction cookware kitchen cooking utensils set nonstick, with frying pans and saucepans gas stove safe for Thanksgiving Day Christmas gift. [image online] available at: < https://a.co/d/09EfQGSH >  [Accessed 19 April 2026]

Kitchen stuff Plus, 1987. Tramontina Geo Cookware Combo- set of 10. [image online] Available at:< https://pin.it/4wnLJcsKB> [Accessed 19 April 2026]

Amazon, 2026. Kochsteller 10pcs Pots and pans set nonstick with wood handles. [image online] Available at: < https://pin.it/79S4eHZvz> [Accessed 19 April 2026]

Desertcart, 2026. Kitchen academy bakeware and cookware set- 30 piece induction hob pans and pots set non stick, black granite cooking saucepen set PFOA and PFOS free. [image online] Available at:<https://www.desertcart.co.za/products524474870-kitchen-academy-bakeware-and-cookware-set-30-piece-induction-hob> [Accessed 18 June 2026]

JUMIA, 2026. UCC LIFE GREANITE COATING KITCHEN COOKWARE SET. [image online] Available at: <https://www.jumia.co.ke/generic-ucc-life-granite-coating-kitchen-cookware-set-210787979.html> [Accessed 18 June 2026]

JUMIA, 2026. UCC LIFE UCCLIFE 5 Set of quality Ceramic Pot. [image online] Available at: <https://www.jumia.co.ke/generic-ucc-life-granite-coating-kitchen-cookware-set-210787979.html> [Accessed 18 June 2026]