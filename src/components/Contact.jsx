import { useRef, useEffect, useState } from "react";

/**
 * Displays an external link icon.
 *
 * @param {Object} props
 * @param {string} props.className - Optional CSS class name.
 * @returns {JSX.Element} Rendered SVG icon.
 */
const IconExternalLink = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M8.636 3.5a.5.5 0 0 0 0 1h2.657L6.146 9.646a.5.5 0 1 0 .708.708L12 5.207v2.657a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5H8.636z"
    />
    <path
      fillRule="evenodd"
      d="M2.5 2A1.5 1.5 0 0 0 1 3.5v10A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-1 0v3.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H6a.5.5 0 0 0 0-1H2.5z"
    />
  </svg>
);

/**
 * Displays an upward arrow icon.
 *
 * @param {Object} props
 * @param {string} props.className - Optional CSS class name.
 * @returns {JSX.Element} Rendered SVG icon.
 */
const IconArrowUp = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M8 15a.5.5 0 0 0 .5-.5V2.707l5.146 5.147a.5.5 0 0 0 .708-.708l-6-6a.5.5 0 0 0-.708 0l-6 6a.5.5 0 1 0 .708.708L7.5 2.707V14.5A.5.5 0 0 0 8 15z"
    />
  </svg>
);

const WEB3FORMS_ACCESS_KEY = "71c0aeab-2d9a-4bcb-83be-7582efbd3812";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Displays the contact section with a controlled form.
 *
 * The component validates the form on submit, sends the message through
 * Web3Forms, displays accessible status feedback, and keeps a direct email
 * fallback link available.
 *
 * @returns {JSX.Element} Rendered contact section.
 */
export default function Contact() {
  const cardRef = useRef(null);
  const orbRef = useRef(null);

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const card = cardRef.current;
    const orb = orbRef.current;

    if (!card || !orb) return;

    /**
     * Moves the glow orb based on the cursor position inside the card.
     *
     * @param {MouseEvent} e - Mouse move event.
     */
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();

      orb.style.left = `${e.clientX - rect.left}px`;
      orb.style.top = `${e.clientY - rect.top}px`;
      orb.style.opacity = "1";
    };

    /**
     * Hides the glow orb when the cursor leaves the card.
     */
    const onLeave = () => {
      orb.style.opacity = "0";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /**
   * Validates contact form values.
   *
   * @param {Object} formValues - Current form values.
   * @param {string} formValues.name - Sender name.
   * @param {string} formValues.email - Sender email.
   * @param {string} formValues.message - Sender message.
   * @returns {Object} Validation errors indexed by field name.
   */
  const validate = (formValues) => {
    const next = {};

    if (formValues.name.trim().length < 2) {
      next.name = "Indiquez votre nom.";
    }

    if (!EMAIL_RE.test(formValues.email.trim())) {
      next.email = "Adresse e-mail invalide.";
    }

    if (formValues.message.trim().length < 10) {
      next.message = "Message trop court (10 caractères minimum).";
    }

    return next;
  };

  /**
   * Updates a form field and clears its current error.
   *
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - Change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) =>
      currentErrors[name]
        ? { ...currentErrors, [name]: undefined }
        : currentErrors,
    );

    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  /**
   * Validates and sends the contact form.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const next = validate(values);

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: values.name,
          email: values.email,
          message: values.message,
          subject: `Portfolio - message de ${values.name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setValues({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div ref={cardRef} className="contact-card">
          <div ref={orbRef} className="contact-orb" />

          <div className="contact-inner">
            <p className="section-label">Contact</p>
            <h2 className="contact-title">Travaillons ensemble.</h2>

            <p className="contact-sub">
              En recherche d'une <strong>alternance</strong> à partir de{" "}
              <strong>septembre 2026</strong> (Strasbourg ou Lille), dans le
              développement, l'automatisation et l'ingénierie logicielle.
            </p>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-row">
                <div className="contact-field">
                  <label className="contact-label" htmlFor="contact-name">
                    Nom
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="contact-input"
                    placeholder="Votre nom"
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    autoComplete="name"
                  />

                  {errors.name && (
                    <span id="err-name" className="contact-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label className="contact-label" htmlFor="contact-email">
                    E-mail
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="contact-input"
                    placeholder="vous@exemple.com"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    autoComplete="email"
                  />

                  {errors.email && (
                    <span id="err-email" className="contact-error">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  className="contact-textarea"
                  placeholder="Quelques mots sur votre projet ou votre proposition..."
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                />

                {errors.message && (
                  <span id="err-message" className="contact-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="contact-form-footer">
                <button
                  type="submit"
                  className="btn-primary contact-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Envoi..." : "Envoyer le message"}
                </button>

                <p className="contact-status" aria-live="polite">
                  {status === "success" && (
                    <span className="contact-status--success">
                      Message envoyé, merci. Je reviens vers vous rapidement.
                    </span>
                  )}

                  {status === "error" && (
                    <span className="contact-status--error">
                      Échec de l'envoi. Vous pouvez m'écrire directement à{" "}
                      <a
                        href="mailto:nawfel.idaali.pro@gmail.com"
                        className="contact-status-link"
                      >
                        nawfel.idaali.pro@gmail.com
                      </a>
                      .
                    </span>
                  )}
                </p>
              </div>
            </form>

            <div className="contact-links">
              <a
                href="mailto:nawfel.idaali.pro@gmail.com"
                className="contact-mail"
              >
                nawfel.idaali.pro@gmail.com
                <IconExternalLink className="contact-arrow" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-scroll-top">
          <button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut de la page"
          >
            <IconArrowUp className="scroll-top-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
