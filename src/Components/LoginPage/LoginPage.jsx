import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GuestLogin } from "../GuestLogin/GuestLogin";
import { fetchData } from "../../helper/helperFunctions";
import { Logo } from "../Logo/Logo";

export function LoginPage() {
  // State for submitted
  const [backendErrors, setBackendErrors] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const dataToSubmit = JSON.stringify(data);

    try {
      const response = await fetchData(`login`, "POST", dataToSubmit);

      if (response.status === 401) {
        setBackendErrors("Incorrect username/password");
        return;
      }
      const fetchedData = await response.json();

      if (fetchedData) navigate("/home");
    } catch (err) {
      if (err) navigate("/error");
    }
  }

  return (
    <>
      <section className={styles.page}>
        <section className={styles.wrapper}>
          <Logo />
          <h1 className={styles.title}>Blue | login</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.row}>
              <input
                placeholder="Username"
                type="text"
                id="username"
                {...register("username", { required: true })}
              />
            </section>

            <section className={styles.row}>
              <input
                placeholder="Password"
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
            </section>
            <section className={styles.errors}>
              {errors.username && errors.username.type === "required" && (
                <span>Please provide username</span>
              )}
              {errors.password && errors.password.type === "required" && (
                <span>Please provide password</span>
              )}
              {backendErrors ? <p>{backendErrors}</p> : null}
            </section>
            <input className={styles.submit} type="submit" value="Login" />
          </form>
          <section className={styles.links}>
            <GuestLogin />
            <Link to={"/signup"}>New here? Signup</Link>
          </section>
        </section>
      </section>
    </>
  );
}
