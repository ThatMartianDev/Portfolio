from crypt import methods
import email
from flask import (
    redirect,
    request,
    render_template
)
import smtplib
from email.message import EmailMessage
from flask_wtf.csrf import CSRFProtect

from app import create_app

# from model import db, Name
# from forms import ContactForm

app = create_app()
csrf = CSRFProtect(app)

@app.route("/")
def home():
    title = 'MARSMAN Web Developer & Designer based in Cairo, Egypt.'
    return render_template("index.html", title=title)

@app.route("/about")
def about():
    title = 'About | MARSMAN Web Developer & Designer based in Cairo, Egypt.'
    return render_template("about.html", title=title)

@app.route("/contact", methods=["GET", "POST"])
def contact():
    title = 'Contact | MARSMAN'
    if request.method == 'POST':

        form_data = request.form
        service = form_data["service"]
        client_name = form_data["name"]
        bname = form_data["bname"]
        bindustry = form_data["bindustry"]
        if bindustry == "":
            bindustry = "not specified"

        message = form_data["message"]
        if message == "":
            message = "not specified"
        contact_way = form_data.get("contact")
        client_email = form_data["mail"]
        client_number = form_data["phone"]
        if client_number == "":
            client_number = "not specified"

        copy_of_mail = form_data["getcopy"]
        if not copy_of_mail:
            copy_of_mail = "no"


        MY_EMAIL_ADDRESS = 'myEmail'
        EMAIL_PASSWORD = 'myPassword'

        def send_mail():
            client_info = f'name: {client_name}\nbussiness name: {bname}\n industry: {bindustry}\nreaching out method : {contact_way}\n Client Email : {client_email}'
            client_service = f'service: {service}\nmessage:\n{message}'
            mail_content = f'dear {client_name},\n\nThank you for approaching me regarding the {service} solution, I will get back to you as soon as i can!\n\nHere are your submitted info:\n\n Client Info:\n\n{client_info}\n\n{client_service}\n'

            msg = EmailMessage()
            msg['Subject'] = service
            msg['From'] = MY_EMAIL_ADDRESS
            server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
            server.login(MY_EMAIL_ADDRESS, EMAIL_PASSWORD)

            if copy_of_mail == "yes":
                msg['To'] = client_email
                msg.set_content(mail_content)
                msg.add_alternative(f"""
                    <body style="width: 100vw; min-height: 200px; overflow-x: hidden;">
                        <table style="width: 100%; height:100%; padding: 10vw 2vw ; margin: auto; font-family: Arial, Helvetica, sans-serif;">
                            <tbody style="width: 90%; margin:auto;">
                                <tr style="margin: 0 auto; width: 100vw;">
                                    <th style="font-size: 10vw; font-weight:300;">Ya <span style="color: #925700;">Hala</span></th>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 1200px ; height:max-content; margin: 12vh auto auto 0;  font-size: 3vw;">
                                    <td>Dear {client_name},</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 1200px ; height:max-content; margin: 1vw auto auto 0; font-size: 3vw;">
                                    <td>Thank you for approaching me regarding the {service} solution, I'll get back to you as soon as i can!</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 1200px ; height:max-content; margin: 2vw auto 4vw 0;  font-size: 3vw;">
                                    <td>Here are your submitted info:</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 800px ; height: max-content; font-size: 2.5vw; margin: auto; font-weight: 400;">
                                    <td style="color: #925700;">Full Name: </td>
                                    <td>{client_name}</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 800px ; height: max-content; font-size: 2.5vw; margin: auto; font-weight: 400;">
                                    <td style="color: #925700;">Business Name: </td>
                                    <td>{bname}</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 800px ; height: max-content; font-size: 2.5vw; margin: auto; font-weight: 400;">
                                    <td style="color: #925700;">Business Indsutry: </td>
                                    <td>{bindustry}</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 800px ; height: max-content; font-size: 2.5vw; margin: auto; font-weight: 400;">
                                    <td style="color: #925700;">Your message: </td>
                                    <td>{message}</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 800px ; height: max-content; font-size: 2.5vw; margin: auto; font-weight: 400;">
                                    <td style="color: #925700;">Email: </td>
                                    <td>{client_email}</td>
                                </tr>
                                <tr style="display: block; width: 90%; max-width: 800px ; height: max-content; font-size: 2.5vw; margin: auto; font-weight: 400;">
                                    <td style="color: #925700;">Phone Number: </td>
                                    <td>{client_number}</td>
                                </tr>
                                <tr style="display: block; width: max-content; margin: 5vh auto auto 0; font-size: 3vw; font-weight:400;">
                                    <td>Best rgards.</td>
                                </tr>
                                <tr style="display: block; width: max-content; margin: 1vh auto 5vh 0; font-size: 3vw; font-weight:400;">
                                    <td>MARSMAN</td>
                                </tr>
                                <tr style="width: 90%; height:max-content;">
                                    <td style="margin: 5vh auto;"><a href="https://marsman.pythonanywhere.com" style="display: block; width: max-content; height: max-content ; padding: 2vh 10vw; margin: auto; color: white; text-decoration:none; font-size: 2vw; background: transparent; border: 1px solid grey ;border-radius: 2rem;">Go to the website</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                    """, subtype='html')
                server.send_message(msg)
            elif copy_of_mail == "no":
                mail_2me = f'Name: {client_name}\nBussiness name: {bname}\n industry: {bindustry}\n\nreaching out methods:\nClient Email : {client_email}\nPhone Number: {client_number}\nService Needed: {service}\n\nmessage:\n{message}'
                msg['To'] = MY_EMAIL_ADDRESS
                msg.set_content(mail_2me)
                server.send_message(msg)

        send_mail()
        return redirect(request.url)


    return render_template("contact.html", title=title)

@app.route("/website-creation")
def web_creation():
    title ='Website Creation | MARSMAN Web Developer & Designer based in Cairo, Egypt.'
    return render_template("website-creation.html", title=title)

@app.route("/web-development")
def web_development():
    title = 'Web Development | MARSMAN Web Developer & Designer based in Cairo, Egypt.'
    return render_template("web-development.html", title=title)

@app.route("/sitemap.xml")
def sitemap():
        return render_template("sitemap.xml")


if __name__ == '__main__':
    app.run()