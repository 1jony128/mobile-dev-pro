// Управление экранами
let currentScreen = 0;
const screens = document.querySelectorAll('.screen');

// Функция переключения экранов
function showScreen(screenNumber) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.querySelector(`.screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenNumber;
    }
}

// Показать главную страницу
function showMainPage() {
    showScreen(0);
}

// Показать создание заказа
function showCreateOrder() {
    showScreen(1);
    
    // Запустить печатание текста
    setTimeout(() => {
        typeText();
    }, 500);
}

// Функция печатания текста
function typeText() {
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    
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

// Показать экран "Заказ опубликован"
function showOrderPublished() {
    setTimeout(() => {
        showScreen(2);
        
        // Запустить анимации
        startHourglassAnimation();
        startProgressAnimation();
    }, 500);
}

// Показать чат
function showChat() {
    showScreen(3);
    
    // Скрыть все сообщения изначально
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
    });
    
    // Анимация появления сообщений
    setTimeout(() => {
        animateMessages();
    }, 300);
}

// Показать экран отзыва
function showReview() {
    showScreen(4);
    
    // Анимация появления звезд
    setTimeout(() => {
        animateStars();
    }, 300);
}

// Показать финальный экран успеха
function showFinalSuccess() {
    showScreen(5);
    
    // Запустить анимации успеха
    setTimeout(() => {
        startSuccessAnimations();
    }, 300);
}

// Перезапустить анимацию
function restartAnimation() {
    showScreen(0);
    currentScreen = 0;
    
    // Сбросить все анимации
    resetAnimations();
    
    // Очистить поля ввода
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    if (titleInput) titleInput.value = '';
    if (descriptionInput) descriptionInput.value = '';
}

// Анимация песочных часов
function startHourglassAnimation() {
    const sand = document.querySelector('.sand');
    const sandFalling = document.querySelector('.sand-falling');
    
    if (sand) {
        sand.style.animation = 'sandFall 3s infinite';
    }
    
    if (sandFalling) {
        sandFalling.style.animation = 'sandDrop 1s infinite';
    }
}

// Анимация прогресса
function startProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressFill) {
        progressFill.style.animation = 'progress 4s infinite';
    }
}

// Анимация сообщений в чате
function animateMessages() {
    const messages = document.querySelectorAll('.message');
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.transition = 'all 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 800);
    });
}

// Анимация звезд
function animateStars() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        star.style.opacity = '0';
        star.style.transform = 'scale(0)';
        
        setTimeout(() => {
            star.style.transition = 'all 0.3s ease';
            star.style.opacity = '1';
            star.style.transform = 'scale(1)';
        }, index * 200);
    });
}

// Анимации успеха
function startSuccessAnimations() {
    // Анимация галочки
    const checkmark = document.querySelector('.checkmark');
    if (checkmark) {
        checkmark.style.animation = 'checkmarkAppear 0.6s ease-out';
    }
    
    // Анимация конфетти
    const confettiPieces = document.querySelectorAll('.confetti-piece');
    confettiPieces.forEach((piece, index) => {
        piece.style.animation = `confettiFall 3s linear infinite ${index * 0.2}s`;
    });
}

// Сброс анимаций
function resetAnimations() {
    // Сбросить все анимации
    const animatedElements = document.querySelectorAll('[style*="animation"]');
    animatedElements.forEach(element => {
        element.style.animation = 'none';
    });
    
    // Сбросить opacity и transform
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        message.style.opacity = '';
        message.style.transform = '';
        message.style.transition = '';
    });
    
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.opacity = '';
        star.style.transform = '';
        star.style.transition = '';
    });
}

// Автоматическое прохождение анимации
let autoPlay = true;

function startAutoPlay() {
    autoPlay = true;
    autoPlaySequence();
}

function stopAutoPlay() {
    autoPlay = false;
}

function autoPlaySequence() {
    if (!autoPlay) return;
    
    const sequence = [
        { action: showCreateOrder, delay: 3000 },
        { action: showOrderPublished, delay: 8000 },
        { action: showChat, delay: 6000 },
        { action: showReview, delay: 5000 },
        { action: showFinalSuccess, delay: 5000 },
        { action: restartAnimation, delay: 4000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (!autoPlay) return;
        
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

// Анимация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления телефона
    setTimeout(() => {
        const phone = document.querySelector('.phone');
        phone.style.opacity = '0';
        phone.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            phone.style.transition = 'all 0.8s ease';
            phone.style.opacity = '1';
            phone.style.transform = 'translateY(0)';
        }, 100);
    }, 100);
    
    // Запустить автоматическое воспроизведение
    setTimeout(() => {
        startAutoPlay();
    }, 2000);
});

// Добавить стили для анимаций
const style = document.createElement('style');
style.textContent = `
    .phone {
        opacity: 0;
        transform: translateY(50px);
    }
    
    .checkbox.checked {
        background: #007AFF;
        border-color: #007AFF;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
