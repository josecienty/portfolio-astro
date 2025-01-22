import emailjs from 'emailjs-com';
const form = document.getElementById('form-contacto');

const resetForm = () => {
    form.reset();
}

resetForm();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[name="email"]');
    const mensaje = e.target.querySelector('textarea[name="mensaje"]');
    const nombre = e.target.querySelector('input[name="nombre"]');

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
            resetForm();
        },
        (error) => {
            console.error("Error al enviar el correo", error);
            alert("Error al enviar el correo");
        }
    );
});


