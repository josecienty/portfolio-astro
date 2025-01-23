import emailjs from 'emailjs-com';
import butterup from 'butteruptoasts'
import 'butteruptoasts/src/butterup.css';

const form = document.getElementById('form-contacto');

const email = form.querySelector('input[name="email"]');
const mensaje = form.querySelector('textarea[name="mensaje"]');
const nombre = form.querySelector('input[name="nombre"]');

const btn = form.querySelector('button[type="submit"]');
const btnLoad = form.querySelector('button[disabled]');

butterup.options.toastLife = 5000;

const loading = (isLoading) => {
    if (isLoading) {
        btn.classList.add('hidden');
        btnLoad.classList.remove('hidden');

        email.setAttribute('readonly', true);
        mensaje.setAttribute('readonly', true);
        nombre.setAttribute('readonly', true);
    } else {
        btn.classList.remove('hidden');
        btnLoad.classList.add('hidden');

        email.removeAttribute('readonly');
        mensaje.removeAttribute('readonly');
        nombre.removeAttribute('readonly');
    }
}

const resetForm = () => {
    form.reset();
}

resetForm();

const notify = ({ title, message, type }) => {
    butterup.toast({
        title: title,
        message: message,
        type: type,
        location: 'top-right',
        icon: true,
        toastLife: 5000,
    });
}

const validateForm = () => {
    if (email.value.trim().length === 0 || mensaje.value.trim().length === 0 || nombre.value.trim().length === 0) {
        notify({
            title: 'Complete los campos',
            message: 'Todos los campos son obligatorios',
            type: 'error'
        });
        return false;
    }
    return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loading(true);

    if (!validateForm()) {
        loading(false);
        return;
    }

    emailjs.send(
        'service_r4ppxso',
        'admin-1',
        {
            from_name: nombre.value.trim(),
            to_email: email.value.trim(),
            message: mensaje.value.trim()
        },
        'mpkwWBid0Ao4H5IHn'
    ).then(
        (response) => {
            console.log("Correo enviado con éxito", response);
            notify({
                title: 'Correo enviado',
                message: 'Se ha enviado su correo, me pongo en contacto con usted a la brevedad',
                type: 'success'
            });
            resetForm();
        },
        (error) => {
            console.error(error);
            notify({
                title: 'Error',
                message: 'No se pudo enviar el correo, intente de nuevo más tarde',
                type: 'error'
            })
        }
    ).finally(() => {
        loading(false);
    });
});


