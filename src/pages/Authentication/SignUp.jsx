import { Link } from "react-router";
import styles from "./authStyle.module.css";
import supabase from "../../supabase/client";
import toast, { Toaster } from "react-hot-toast";
import Banner from "../../components/Banner/banner";
import SessionContext from "../../context/Session/SessionContext";
import { useContext } from "react";

export default function SignUp() {
  const { user } = useContext(SessionContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { username, email, password } = Object.fromEntries(new FormData(formRegister));
    let { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      console.error("Error details:", error.message);
      formRegister.reset();
      toast.error("Registrazione fallita.");
    } else {
      formRegister.reset();
      toast.success("Registrazione avvenuta con successo!");
    }
  }

  return (
    <>
      {!user && (
        <>
          <Banner />
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.header}>
                <h1 className={styles.title}>Registrazione</h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Username</label>
                  <input type="text" placeholder="Inserisci username" className={styles.input} name="username" id="username" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" placeholder="Inserisci email" className={styles.input} name="email" id="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <input type="password" placeholder="Inserisci password" className={styles.input} name="password" id="password" required />
                </div>
                <button type="submit" className={styles.button}>
                  Registrati
                </button>
              </form>

              <div className={styles.footer}>
                <p className={styles.footerText}>
                  Hai già un account?
                  <Link to="/login" className={styles.signupLink}>
                    <span> Accedi</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <Toaster
            containerStyle={{
              top: 85,
              right: 0,
            }}
            position="bottom-center"
            reverseOrder={false}
            style={{ marginTop: "50px" }}
          />
        </>
      )}
    </>
  );
}
