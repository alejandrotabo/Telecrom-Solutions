<?php
header('Content-Type: text/plain; charset=UTF-8');

$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH'])
	&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

function respond($success, $statusCode)
{
	global $isAjax;
	http_response_code($statusCode);

	if ($isAjax) {
		echo $success ? '1' : '0';
	} else {
		header('Content-Type: text/html; charset=UTF-8');
		$message = $success
			? 'Gracias. Recibimos tu mensaje.'
			: 'No se pudo enviar el mensaje. Revisa los datos e inténtalo de nuevo.';
		echo '<!doctype html><html lang="es"><meta charset="utf-8"><title>Contacto</title>'
			. '<p>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>'
			. '<p><a href="contact.html">Volver al formulario</a></p></html>';
	}
	exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	header('Allow: POST');
	respond(false, 405);
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$comment = $_POST['comment'] ?? '';

	if (!is_string($name) || !is_string($email) || !is_string($comment)) {
		respond(false, 400);
}

$name = trim($name);
$email = trim($email);
$comment = trim($comment);

if ($name === '' || strlen($name) > 120 || strlen($email) > 254
	|| $comment === '' || strlen($comment) > 5000 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	respond(false, 400);
}

$to = 'gamembers@gmail.com';
$subject = 'Nuevo mensaje de contacto Gamembers';
$message = "Nombre: {$name}\nCorreo: {$email}\n\nMensaje:\n{$comment}";
$headers = "Content-Type: text/plain; charset=UTF-8\r\nReply-To: {$email}";
$sent = mail($to, $subject, $message, $headers);

respond($sent, $sent ? 200 : 500);
?>