const firstName = document.getElementsByName("first-name")[0];
const lastName = document.getElementsByName("last-name")[0];
const email = document.getElementsByName("email")[0];
const password = document.getElementsByName("password")[0];
const form = document.getElementsByTagName("form")[0];

const getRequired = (text) => {
  const required = document.createElement("div");
  required.classList.add("required");
  required.innerText = text + " cannot be empty";
  return required;
};

const getMailPattern = () => {
  const mail = document.createElement("div");
  mail.classList.add("required");
  mail.innerText = "Looks like this is not an email";
  return mail;
};

const cleanup = (el) => {
  if (el.classList.contains("invalid")) {
    el.classList.remove("invalid");
    el.parentElement.classList.remove("label-invalid");
    el.nextElementSibling.remove();
  }
};

const handleChange = (e) => {
  const el = document.getElementsByName(e.target.name)[0];
  cleanup(el);
};

const requiredValidation = (el, text) => {
  if (el.value === "") {
    el.classList.add("invalid");
    el.placeholder = "";
    el.parentElement.classList.add("label-invalid");
    el.after(getRequired(text));
  }
};

const emailValidation = (el, text) => {
  cleanup(el);
  if (el.value === "") {
    requiredValidation(el, text);
  } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(el.value)) {
    el.classList.add("invalid");
    el.parentElement.classList.add("label-invalid");
    el.after(getMailPattern());
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  [firstName, lastName, email, password].forEach((el, index) => {
    cleanup(el);
    if (index !== 2) {
      requiredValidation(el, ["First Name", "Last Name", "Email", "Password"][index]);
    } else {
      emailValidation(el, ["First Name", "Last Name", "Email", "Password"][index]);
    }
    el.addEventListener("change", handleChange);
  });

  let status = true;
  [firstName, lastName, email, password].forEach((el) => {
    status = status && el.nextElementSibling?.tagName !== "DIV";
  });
  if (status) {
    [firstName, lastName, email, password].forEach((el, index) => {
      el.value = "";
      el.placeholder = ["First Name", "Last Name", "Email", "Password"][index];
    });
  }
};

form.addEventListener("submit", handleSubmit);
