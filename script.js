// Burger Menu Toggle
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');

function toggleMobileNav() {
    burger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileNav() {
    burger.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

burger.addEventListener('click', toggleMobileNav);
overlay.addEventListener('click', closeMobileNav);

// Close mobile nav when clicking on links
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Handle example CTA buttons
document.querySelectorAll('.example-cta').forEach(button => {
    button.addEventListener('click', function() {
        // Smooth scroll to contact section
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Form submission via Formspree
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = this;
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });

    if (!valid) return;

    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Отправка...';

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        if (response.ok) {
            button.textContent = 'Сообщение отправлено!';
            button.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
            form.reset();
        } else {
            button.textContent = 'Ошибка отправки';
            button.style.background = 'linear-gradient(135deg, #ff4444, #ff00aa)';
        }
    } catch (err) {
        button.textContent = 'Ошибка сети';
        button.style.background = 'linear-gradient(135deg, #ff4444, #ff00aa)';
    } finally {
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #00d4ff, #ff00ff)';
        }, 3000);
    }
});

// Add floating animation to service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

// Add hover effects for footer contacts
document.querySelectorAll('.footer-contact-item a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#00d4ff';
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = 'rgba(255, 255, 255, 0.8)';
        this.style.transform = 'translateY(0)';
    });
});

// Add hover effects for contact items
document.querySelectorAll('.contact-item a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#00d4ff';
        this.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = 'rgba(255, 255, 255, 0.8)';
        this.style.transform = 'scale(1)';
    });
});

// Service Marketplace Animation
let serviceCurrentScreen = 0;
let serviceAutoPlay = true;

function showServiceScreen(screenNumber) {
    const servicePhone = document.querySelector('.service-phone');
    if (!servicePhone) return;
    
    const screens = servicePhone.querySelectorAll('.service-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = servicePhone.querySelector(`.service-screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        serviceCurrentScreen = screenNumber;
    }
}

function showServiceCreateOrder() {
    showServiceScreen(1);
    
    // Запустить печатание текста
    setTimeout(() => {
        typeServiceText();
    }, 500);
}

function typeServiceText() {
    const titleInput = document.getElementById('service-title-input');
    const descriptionInput = document.getElementById('service-description-input');
    
    if (!titleInput || !descriptionInput) return;
    
    const titleText = "Сборка стола";
    const descriptionText = "Нужно собрать стол из ИКЕА. Есть инструкция, но нужна помощь специалиста.";
    
    // Печатаем название
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
        titleInput.value = titleText.substring(0, titleIndex);
        titleIndex++;
        
        if (titleIndex > titleText.length) {
            clearInterval(titleInterval);
            
            // Начинаем печатать описание
            setTimeout(() => {
                let descIndex = 0;
                const descInterval = setInterval(() => {
                    descriptionInput.value = descriptionText.substring(0, descIndex);
                    descIndex++;
                    
                    if (descIndex > descriptionText.length) {
                        clearInterval(descInterval);
                    }
                }, 80);
            }, 1000);
        }
    }, 150);
}

function showServiceOrderPublished() {
    setTimeout(() => {
        showServiceScreen(2);
        
        // Запустить анимации
        startServiceHourglassAnimation();
        startServiceProgressAnimation();
    }, 500);
}

function showServiceChat() {
    showServiceScreen(3);
    
    // Скрыть все сообщения изначально
    const servicePhone = document.querySelector('.service-phone');
    if (!servicePhone) return;
    
    const messages = servicePhone.querySelectorAll('.message');
    messages.forEach(message => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
    });
    
    // Анимация появления сообщений
    setTimeout(() => {
        animateServiceMessages();
    }, 300);
}

function startServiceHourglassAnimation() {
    const servicePhone = document.querySelector('.service-phone');
    if (!servicePhone) return;
    
    const sand = servicePhone.querySelector('.sand');
    const sandFalling = servicePhone.querySelector('.sand-falling');
    
    if (sand) {
        sand.style.animation = 'sandFall 3s infinite';
    }
    
    if (sandFalling) {
        sandFalling.style.animation = 'sandDrop 1s infinite';
    }
}

function startServiceProgressAnimation() {
    const servicePhone = document.querySelector('.service-phone');
    if (!servicePhone) return;
    
    const progressFill = servicePhone.querySelector('.progress-fill');
    
    if (progressFill) {
        progressFill.style.animation = 'progress 4s infinite';
    }
}

function animateServiceMessages() {
    const servicePhone = document.querySelector('.service-phone');
    if (!servicePhone) return;
    
    const messages = servicePhone.querySelectorAll('.message');
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.transition = 'all 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 800);
    });
}

function restartServiceAnimation() {
    showServiceScreen(0);
    serviceCurrentScreen = 0;
    
    // Очистить поля ввода
    const titleInput = document.getElementById('service-title-input');
    const descriptionInput = document.getElementById('service-description-input');
    if (titleInput) titleInput.value = '';
    if (descriptionInput) descriptionInput.value = '';
    
    // Сбросить анимации
    const servicePhone = document.querySelector('.service-phone');
    if (!servicePhone) return;
    
    const messages = servicePhone.querySelectorAll('.message');
    messages.forEach(message => {
        message.style.opacity = '';
        message.style.transform = '';
        message.style.transition = '';
    });
}

function startServiceAutoPlay() {
    serviceAutoPlay = true;
    serviceAutoPlaySequence();
}

function stopServiceAutoPlay() {
    serviceAutoPlay = false;
}

function serviceAutoPlaySequence() {
    if (!serviceAutoPlay) return;
    
    const sequence = [
        { action: showServiceCreateOrder, delay: 3000 },
        { action: showServiceOrderPublished, delay: 8000 },
        { action: showServiceChat, delay: 6000 },
        { action: restartServiceAnimation, delay: 4000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (!serviceAutoPlay) return;
        
        if (currentStep < sequence.length) {
            const step = sequence[currentStep];
            step.action();
            
            currentStep++;
            
            setTimeout(nextStep, step.delay);
        } else {
            currentStep = 0;
            setTimeout(nextStep, 4000);
        }
    }
    
    setTimeout(nextStep, 3000);
}

// E-commerce Animation
let ecommerceCurrentScreen = 0;
let ecommerceAutoPlay = true;

function showEcommerceScreen(screenNumber) {
    const ecommercePhone = document.querySelector('.ecommerce-phone');
    if (!ecommercePhone) return;
    
    const screens = ecommercePhone.querySelectorAll('.ecommerce-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = ecommercePhone.querySelector(`.ecommerce-screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        ecommerceCurrentScreen = screenNumber;
    }
}

function showEcommerceProducts() {
    showEcommerceScreen(1);
}

function showEcommerceCart() {
    setTimeout(() => {
        showEcommerceScreen(2);
    }, 3000);
}

function restartEcommerceAnimation() {
    showEcommerceScreen(0);
    ecommerceCurrentScreen = 0;
}

function startEcommerceAutoPlay() {
    ecommerceAutoPlay = true;
    ecommerceAutoPlaySequence();
}

function ecommerceAutoPlaySequence() {
    if (!ecommerceAutoPlay) return;
    
    const sequence = [
        { action: showEcommerceProducts, delay: 4000 },
        { action: showEcommerceCart, delay: 6000 },
        { action: restartEcommerceAnimation, delay: 4000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (!ecommerceAutoPlay) return;
        
        if (currentStep < sequence.length) {
            const step = sequence[currentStep];
            step.action();
            
            currentStep++;
            
            setTimeout(nextStep, step.delay);
        } else {
            currentStep = 0;
            setTimeout(nextStep, 4000);
        }
    }
    
    setTimeout(nextStep, 4000);
}

// Fitness Animation
let fitnessCurrentScreen = 0;
let fitnessAutoPlay = true;

function showFitnessScreen(screenNumber) {
    const fitnessPhone = document.querySelector('.fitness-phone');
    if (!fitnessPhone) return;
    
    const screens = fitnessPhone.querySelectorAll('.fitness-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = fitnessPhone.querySelector(`.fitness-screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        fitnessCurrentScreen = screenNumber;
    }
}

function showFitnessWorkout() {
    showFitnessScreen(1);
}

function restartFitnessAnimation() {
    showFitnessScreen(0);
    fitnessCurrentScreen = 0;
}

function startFitnessAutoPlay() {
    fitnessAutoPlay = true;
    fitnessAutoPlaySequence();
}

function fitnessAutoPlaySequence() {
    if (!fitnessAutoPlay) return;
    
    const sequence = [
        { action: showFitnessWorkout, delay: 5000 },
        { action: restartFitnessAnimation, delay: 6000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (!fitnessAutoPlay) return;
        
        if (currentStep < sequence.length) {
            const step = sequence[currentStep];
            step.action();
            
            currentStep++;
            
            setTimeout(nextStep, step.delay);
        } else {
            currentStep = 0;
            setTimeout(nextStep, 4000);
        }
    }
    
    setTimeout(nextStep, 5000);
}

// Food Delivery Animation
let foodCurrentScreen = 0;
let foodAutoPlay = true;

function showFoodScreen(screenNumber) {
    const foodPhone = document.querySelector('.food-phone');
    if (!foodPhone) return;
    
    const screens = foodPhone.querySelectorAll('.food-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = foodPhone.querySelector(`.food-screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        foodCurrentScreen = screenNumber;
    }
}

function showFoodRestaurants() {
    showFoodScreen(1);
}

function showFoodOrder() {
    setTimeout(() => {
        showFoodScreen(2);
    }, 4000);
}

function showFoodSuccess() {
    setTimeout(() => {
        showFoodScreen(3);
        startFoodDeliveryAnimation();
    }, 3000);
}

function startFoodDeliveryAnimation() {
    const foodPhone = document.querySelector('.food-phone');
    if (!foodPhone) return;
    
    const truck = foodPhone.querySelector('.delivery-truck');
    const dots = foodPhone.querySelectorAll('.progress-dot');
    
    if (truck) {
        truck.style.animation = 'truckMove 3s infinite';
    }
    
    dots.forEach((dot, index) => {
        setTimeout(() => {
            dot.classList.add('active');
        }, index * 1000);
    });
}

function restartFoodAnimation() {
    showFoodScreen(0);
    foodCurrentScreen = 0;
    
    // Сбросить анимации
    const foodPhone = document.querySelector('.food-phone');
    if (!foodPhone) return;
    
    const dots = foodPhone.querySelectorAll('.progress-dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
}

function startFoodAutoPlay() {
    foodAutoPlay = true;
    foodAutoPlaySequence();
}

function foodAutoPlaySequence() {
    if (!foodAutoPlay) return;
    
    const sequence = [
        { action: showFoodRestaurants, delay: 4000 },
        { action: showFoodOrder, delay: 5000 },
        { action: showFoodSuccess, delay: 4000 },
        { action: restartFoodAnimation, delay: 4000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (!foodAutoPlay) return;
        
        if (currentStep < sequence.length) {
            const step = sequence[currentStep];
            step.action();
            
            currentStep++;
            
            setTimeout(nextStep, step.delay);
        } else {
            currentStep = 0;
            setTimeout(nextStep, 4000);
        }
    }
    
    setTimeout(nextStep, 4000);
}

// Social Network Animation
let socialCurrentScreen = 0;
let socialAutoPlay = true;

function showSocialScreen(screenNumber) {
    const socialPhone = document.querySelector('.social-phone');
    if (!socialPhone) return;
    
    const screens = socialPhone.querySelectorAll('.social-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = socialPhone.querySelector(`.social-screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        socialCurrentScreen = screenNumber;
    }
}

function showSocialFeed() {
    showSocialScreen(1);
}

function restartSocialAnimation() {
    showSocialScreen(0);
    socialCurrentScreen = 0;
}

function startSocialAutoPlay() {
    socialAutoPlay = true;
    socialAutoPlaySequence();
}

function socialAutoPlaySequence() {
    if (!socialAutoPlay) return;
    
    const sequence = [
        { action: showSocialFeed, delay: 5000 },
        { action: restartSocialAnimation, delay: 6000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (!socialAutoPlay) return;
        
        if (currentStep < sequence.length) {
            const step = sequence[currentStep];
            step.action();
            
            currentStep++;
            
            setTimeout(nextStep, step.delay);
        } else {
            currentStep = 0;
            setTimeout(nextStep, 4000);
        }
    }
    
    setTimeout(nextStep, 5000);
}

// IoT Control Animation
let iotCurrentScreen = 0;
let iotAutoPlay = true;

function showIoTScreen(screenNumber) {
    const iotPhone = document.querySelector('.iot-phone');
    if (!iotPhone) return;
    
    const screens = iotPhone.querySelectorAll('.iot-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = iotPhone.querySelector(`.iot-screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        iotCurrentScreen = screenNumber;
    }
}

function showIoTDevices() {
    showIoTScreen(1);
}

function showIoTRooms() {
    setTimeout(() => {
        showIoTScreen(2);
    }, 4000);
}

function restartIoTAnimation() {
    showIoTScreen(0);
    iotCurrentScreen = 0;
}

function startIoTAutoPlay() {
    iotAutoPlay = true;
    iotAutoPlaySequence();
}

function iotAutoPlaySequence() {
    if (!iotAutoPlay) return;
    
    const sequence = [
        { action: showIoTDevices, delay: 4000 },
        { action: showIoTRooms, delay: 5000 },
        { action: restartIoTAnimation, delay: 4000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (!iotAutoPlay) return;
        
        if (currentStep < sequence.length) {
            const step = sequence[currentStep];
            step.action();
            
            currentStep++;
            
            setTimeout(nextStep, step.delay);
        } else {
            currentStep = 0;
            setTimeout(nextStep, 4000);
        }
    }
    
    setTimeout(nextStep, 4000);
}

// Функция для предзагрузки изображений товаров
function preloadProductImages() {
    const productImages = document.querySelectorAll('.product-img');
    
    productImages.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            this.parentElement.style.background = 'linear-gradient(135deg, #FF6B6B, #FF8E8E)';
            this.parentElement.innerHTML = '<div style="font-size: 16px; color: white;">📱</div>';
        });
    });
}

// Функция для запуска анимаций при появлении на экране
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.3, // Запускать когда 30% элемента видно
        rootMargin: '50px' // Запускать за 50px до появления
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const phoneContainer = entry.target;
                const appType = phoneContainer.className.split(' ')[0]; // Получаем тип приложения
                
                // Добавляем класс анимации появления
                phoneContainer.classList.add('animate-in');
                
                // Запускаем соответствующую анимацию с небольшой задержкой
                setTimeout(() => {
                    switch(appType) {
                        case 'service-phone-container':
                            startServiceAutoPlay();
                            break;
                        case 'ecommerce-phone-container':
                            startEcommerceAutoPlay();
                            break;
                        case 'fitness-phone-container':
                            startFitnessAutoPlay();
                            break;
                        case 'food-phone-container':
                            startFoodAutoPlay();
                            break;
                        case 'social-phone-container':
                            startSocialAutoPlay();
                            break;
                        case 'iot-phone-container':
                            startIoTAutoPlay();
                            break;
                    }
                }, 800); // Задержка после анимации появления
                
                // Отключаем наблюдение после первого запуска
                observer.unobserve(phoneContainer);
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми контейнерами телефонов
    const phoneContainers = document.querySelectorAll([
        '.service-phone-container',
        '.ecommerce-phone-container', 
        '.fitness-phone-container',
        '.food-phone-container',
        '.social-phone-container',
        '.iot-phone-container'
    ].join(','));

    phoneContainers.forEach(container => {
        observer.observe(container);
    });
}

// Инициализация всех анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Предзагрузка изображений товаров
    preloadProductImages();
    
    // Инициализация Intersection Observer для запуска анимаций при появлении на экране
    initIntersectionObserver();
});

// Добавить стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes sandFall {
        0% { height: 15px; }
        50% { height: 5px; }
        100% { height: 15px; }
    }
    
    @keyframes sandDrop {
        0% { opacity: 0; transform: translateX(-50%) translateY(-5px); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: translateX(-50%) translateY(5px); }
    }
    
    @keyframes progress {
        0% { width: 0%; }
        100% { width: 100%; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60% { transform: translateY(-2px); }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);
