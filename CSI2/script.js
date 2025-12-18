document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Sidebar Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    // 2. Expandable Subject Cards (Accordion/Mind Map Logic)
    const expandableHeaders = document.querySelectorAll('.expand-trigger');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.chevron-icon');
            
            if (content) {
                content.classList.toggle('hidden');
                header.classList.toggle('active');
                if(icon) {
                    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            }
        });
    });

    // 3. Mock Form Submission (Visual Feedback)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Processing...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Simulate network request
            setTimeout(() => {
                btn.innerText = 'Success!';
                btn.style.backgroundColor = 'var(--success)';
                
                setTimeout(() => {
                    // Redirect based on role (mock logic)
                    if (window.location.href.includes('login') || window.location.href.includes('register')) {
                        // Check if it's teacher or student (simple hack for demo)
                        const isTeacher = document.body.innerText.includes('Teacher');
                        // In a real app we'd check the form data. For now, let's just default to student dashboard 
                        // unless we explicitly see a teacher selection.
                        const roleSelect = form.querySelector('select');
                        if (roleSelect && roleSelect.value === 'teacher') {
                            window.location.href = 'teacher_dashboard.html';
                        } else {
                            window.location.href = 'student_dashboard.html';
                        }
                    } else {
                        btn.innerText = originalText;
                        btn.disabled = false;
                        btn.style.backgroundColor = '';
                        btn.style.opacity = '1';
                        // Reset form
                        form.reset();
                        alert('Action completed successfully!');
                    }
                }, 800);
            }, 1000);
        });
    });
});
