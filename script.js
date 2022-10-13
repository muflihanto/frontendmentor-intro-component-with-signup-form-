const elementsName = ["first-name", "last-name", "email", "password", "signup-form"];
const innerText = ["First Name", "Last Name", "Email Address", "Password"];
const [firstName, lastName, email, password, form] = elementsName.map((el) => {
  return document.getElementsByName(el)[0];
});

const getRequiredAlert = (text) => {
  const required = document.createElement("div");
  required.classList.add("required");
  required.innerText = text + " cannot be empty";
  return required;
};

const getEmailPatternAlert = () => {
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

const handleKeyUp = (e) => {
  const el = document.getElementsByName(e.target.name)[0];
  cleanup(el);
  el.placeholder = innerText[elementsName.indexOf(e.target.name)];
};

const requiredValidation = (el, text) => {
  if (el.value === "") {
    el.classList.add("invalid");
    el.placeholder = "";
    el.parentElement.classList.add("label-invalid");
    el.after(getRequiredAlert(text));
  }
};

const emailValidation = (el, text) => {
  cleanup(el);
  if (el.value === "") {
    requiredValidation(el, text);
  } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(el.value)) {
    el.classList.add("invalid");
    el.parentElement.classList.add("label-invalid");
    el.after(getEmailPatternAlert());
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  [firstName, lastName, email, password].forEach((el, index) => {
    cleanup(el);
    if (index !== 2) {
      requiredValidation(el, innerText[index]);
    } else {
      emailValidation(el, innerText[index]);
    }
    el.addEventListener("keyup", handleKeyUp, { once: true });
  });

  let status = true;
  [firstName, lastName, email, password].forEach((el) => {
    status = status && el.nextElementSibling?.tagName !== "DIV";
  });
  if (status) {
    [firstName, lastName, email, password].forEach((el, index) => {
      el.value = "";
      el.placeholder = innerText[index];
    });
    Swal.fire("Congratulations!", "Your account has been successfully created.", "success");
  }
};

form.addEventListener("submit", handleSubmit);
