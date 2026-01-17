import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  
  /**
   * Envía un correo con un link para restablecer la contraseña.
   * @param email - El correo del docente
   * @param token - El token único generado por ti para verificar el cambio
   */
  async sendPasswordResetLink(email: string, token: string, username: string) {
    // lucho del futuro, cuando este subida saca el localhost
    const rawFrontend = process.env.FRONTEND_URL || 'http://localhost:5173';
    const frontend = rawFrontend.replace(/\/+$/g, '');
    const resetLink = `${frontend}/recuperar-password?token=${token}`;

    try {
      const data = await resend.emails.send({
        from: 'Soporte Escolar <onboarding@resend.dev>', 
        to: [email],
        subject: 'Recuperar Contraseña - Panel Docente',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2b7cee;">Hola, ${username}</h2>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta docente.</p>
            <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
            
            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #2b7cee; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 16px 0;">
              Restablecer Contraseña
            </a>
            
            <p style="font-size: 12px; color: #666;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">Sistema de Gestión Escolar</p>
          </div>
        `
      });

      console.log('Email enviado ID:', data.data?.id);
      return { success: true, id: data.data?.id };
      
    } catch (error) {
      console.error('Error enviando email con Resend:', error);
      throw new Error('No se pudo enviar el correo de recuperación');
    }
  }

  async sendAccountCreated(email: string, username: string, passwordPlain: string) {
    try {
      const data = await resend.emails.send({
        from: 'Soporte Escolar <onboarding@resend.dev>',
        to: [email],
        subject: 'Tu cuenta ha sido creada',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2b7cee;">Hola, ${username}</h2>
            <p>Tu cuenta ha sido creada por el administrador.</p>
            <p><strong>Usuario:</strong> ${username}</p>
            <p><strong>Contraseña temporal:</strong> ${passwordPlain}</p>
            <p>Por seguridad, por favor cambia tu contraseña la primera vez que ingreses.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">Sistema de Gestión Escolar</p>
          </div>
        `
      });

      console.log('Email de bienvenida enviado ID:', data.data?.id);
      return { success: true, id: data.data?.id };
    } catch (error) {
      console.error('Error enviando email de bienvenida con Resend:', error);
      // No lanzamos para que el registro no falle por un email
      return { success: false };
    }
  }
}

export default new EmailService();