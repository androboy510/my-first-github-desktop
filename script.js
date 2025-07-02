// 90년대 레트로 아니메 스타일 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 네비게이션 활성화
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // 스크롤 이벤트로 네비게이션 활성화
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 네비게이션 클릭 이벤트
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 사이버 버튼 효과
    const cyberButton = document.querySelector('.cyber-button');
    if (cyberButton) {
        cyberButton.addEventListener('click', function() {
            // 버튼 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
            
            // 애니메이션 섹션으로 스크롤
            const animeSection = document.querySelector('#anime');
            if (animeSection) {
                animeSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // 카드 호버 효과 강화
    const animeCards = document.querySelectorAll('.anime-card');
    animeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 캐릭터 아이템 클릭 효과
    const characterItems = document.querySelectorAll('.character-item');
    characterItems.forEach(item => {
        item.addEventListener('click', function() {
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
            
            // 캐릭터 이름 표시
            const characterName = this.querySelector('h3').textContent;
            showNotification(`${characterName} 캐릭터를 선택했습니다!`);
        });
    });
    
    // 갤러리 아이템 클릭 효과
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 회전 효과
            this.style.transform = 'rotate(5deg) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'rotate(2deg)';
            }, 300);
            
            const galleryName = this.querySelector('p').textContent;
            showNotification(`${galleryName} 갤러리를 열었습니다!`);
        });
    });
    
    // 통계 숫자 애니메이션
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
    
    // 숫자 애니메이션 함수
    function animateNumber(element) {
        const finalValue = element.textContent;
        const isInfinity = finalValue === '∞';
        
        if (isInfinity) {
            element.style.animation = 'neon 1s ease-in-out infinite alternate';
            return;
        }
        
        const numericValue = parseInt(finalValue.replace(/,/g, ''));
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(currentValue).toLocaleString();
        }, 50);
    }
    
    // 알림 표시 함수
    function showNotification(message) {
        // 기존 알림 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00ffff, #0080ff);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 5px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
            box-shadow: 0 0 20px rgba(0,255,255,0.5);
        `;
        
        document.body.appendChild(notification);
        
        // 3초 후 제거
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // 키보드 단축키
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case '1':
                document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                document.querySelector('#anime').scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                document.querySelector('#characters').scrollIntoView({ behavior: 'smooth' });
                break;
            case '4':
                document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
                break;
            case '5':
                document.querySelector('#community').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
    
    // 마우스 움직임에 따른 배경 효과
    document.addEventListener('mousemove', function(e) {
        const stars = document.querySelector('.stars');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        stars.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
    
    // 페이지 로드 완료 효과
    setTimeout(() => {
        document.body.style.opacity = '1';
        showNotification('흔들리는 오타쿠의 밤에 오신 것을 환영합니다!');
    }, 1000);
});

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 1s ease-in;
    }
    
    .notification {
        font-family: 'Orbitron', monospace;
    }
`;
document.head.appendChild(style); 