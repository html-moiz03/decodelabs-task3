document.addEventListener('DOMContentLoaded', () => {
                if (!HTMLElement.prototype.hasOwnProperty('popover')) {
                    const btn = document.querySelector('.hamburger');
                    const menu = document.getElementById('mobile-menu');
                    const closeBtn = document.querySelector('.mobile-nav-close');
                    btn.addEventListener('click', () => menu.classList.add('is-open'));
                    closeBtn.addEventListener('click', () => menu.classList.remove('is-open'));
                }

                //Cart

                let cart = [];
                const cartSidebar = document.getElementById('cart-sidebar');
                const cartToggle  = document.getElementById('cart-toggle');
                const cartClose   = document.getElementById('cart-close');
                const cartItemsEl = document.getElementById('cart-items');
                const cartCountEl = document.getElementById('cart-count');
                const cartTotalEl = document.getElementById('cart-total');

                cartToggle.addEventListener('click', () => cartSidebar.classList.add('is-open'));
                cartClose.addEventListener('click',  () => cartSidebar.classList.remove('is-open'));

                function renderCart() {
                    cartItemsEl.innerHTML = '';
                    if (cart.length === 0) {
                        cartItemsEl.innerHTML ='<li class="cart-empty">No items yet.</li>';
                    } else {
                        cart.forEach((item, index) => {
                            const li = document.createElement('li');
                            li.className = 'cart-item';
                            li.innerHTML = `
                                <span class="cart-item-name">${item.name}</span>
                                <span class="cart-item-price">${item.price}</span>
                                <button class="cart-item-remove" aria-label="Remove ${item.name}" data-index="${index}">✕</button>
                            `;
                            cartItemsEl.appendChild(li);
                        });
                    }
                    cartCountEl.textContent = cart.length;
                    const total = cart.reduce((sum, item) => {
                        return sum + parseInt(item.price.replace(/[^0-9]/g, ''));
                    }, 0);
                    cartTotalEl.textContent = 'Rs. ' + total.toLocaleString();
                }

                cartItemsEl.addEventListener('click', (e) => {
                    if (e.target.classList.contains('cart-item-remove')) {
                        cart.splice(parseInt(e.target.dataset.index), 1);
                        renderCart();
                    }
                });

                document.querySelectorAll('.btn-add-cart').forEach(button => {
                    button.addEventListener('click', () => {
                        const card  = button.closest('.menu-card');
                        const name  = card.querySelector('.card-title').textContent;
                        const price = card.querySelector('.card-price').textContent;
                        cart.push({ name, price });
                        renderCart();
                        button.textContent = 'Added ✓';
                        button.style.backgroundColor = '#2a7a6e';
                        setTimeout(() => {
                            button.textContent = 'Add to Cart 🛒';
                            button.style.backgroundColor = '';
                        }, 1500);
                        cartSidebar.classList.add('is-open');
                    });
                });

                const darkToggleBtn = document.getElementById('dark-toggle');
                let isDarkMode = localStorage.getItem('theme') === 'dark';

                function applyDarkMode() {
                    if (isDarkMode) {
                        document.body.classList.add('is-dark');
                        darkToggleBtn.setAttribute('aria-pressed', 'true');
                        darkToggleBtn.setAttribute('aria-label', 'Switch to light mode');
                    } else {
                        document.body.classList.remove('is-dark');
                        darkToggleBtn.setAttribute('aria-pressed', 'false');
                        darkToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
                    }
                }

                applyDarkMode();

                darkToggleBtn.addEventListener('click', () => {
                    isDarkMode = !isDarkMode;
                    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                    applyDarkMode();
                });

                //Filter

                const filterBtns = document.querySelectorAll('.js-filter');
                const menuCards  = document.querySelectorAll('.menu-card');
                let activeFilter = 'all';

                function applyFilter(filter) {
                    filterBtns.forEach(btn => {
                        btn.classList.toggle('is-active', btn.dataset.filter === filter);
                     });
                    menuCards.forEach(card => {
                        const match = filter === 'all' || card.dataset.category === filter;
                        card.classList.toggle('is-hidden', !match);
                    });
                }

                filterBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        activeFilter = btn.dataset.filter;
                        applyFilter(activeFilter);
                     });
                });

                //FAQ

                const faqTriggers = document.querySelectorAll('.js-faq-trigger');

                 function closeAllFaq() {
                    faqTriggers.forEach(trigger => {
                        trigger.setAttribute('aria-expanded', 'false');
                        trigger.nextElementSibling.hidden = true;
                    });
                }

                faqTriggers.forEach(trigger => {
                    trigger.addEventListener('click', () => {
                        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
                        closeAllFaq();
                        if (!isOpen) {
                            trigger.setAttribute('aria-expanded', 'true');
                            trigger.nextElementSibling.hidden = false;
                        }
                    });
                });
            });