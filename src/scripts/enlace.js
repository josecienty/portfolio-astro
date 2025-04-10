import butterup from 'butteruptoasts'
import 'butteruptoasts/src/butterup.css';
butterup.options.toastLife = 5000;

const enlaces = document.querySelector('#projects');

Array.from(enlaces.children)
    .filter(item => item.getAttribute('href') === '#').forEach(item => {
        console.log(item);
        item.addEventListener('click', e => {
            e.preventDefault();
            butterup.toast({
                    title: 'Enlace no disponible',
                    message: 'No esta disponible el acceso a este sitio temporalmente.',
                    type: 'info',
                    location: 'top-right',
                    icon: true,
                    toastLife: 5000,
                });
        });
        item.target = '_self'; // opcional aquí
    });