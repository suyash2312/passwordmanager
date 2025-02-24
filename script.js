// Function to mask the password
function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
      str += "*";
    }
    return str;
  }
  
  // Function to copy text to clipboard
  function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
      () => {
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 2000);
      },
      () => {
        alert("Clipboard copying failed");
      }
    );
  }
  
  // Function to delete a password entry
  const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrUpdated = arr.filter((e) => {
      return e.website !== website;
    });
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
  };
  
  // Function to display saved passwords
  const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length === 0) {
      tb.innerHTML = "No Data To Show";
    } else {
      tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Email</th>
        <th>Password</th>
        <th>Delete</th>
      </tr>`;
      let arr = JSON.parse(data);
      let str = "";
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const emailDisplay = element.email && element.email.trim() !== "" ? element.email : "-";
        const emailCopy = element.email && element.email.trim() !== "" ? 
          `<img onclick="copyText('${element.email}')" src="./copy.svg" alt="Copy" width="10" height="10">` : "";
  
        str += `<tr>
          <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy" width="10" height="10"></td>
          <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy" width="10" height="10"></td>
          <td>${emailDisplay} ${emailCopy}</td>
          <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy" width="10" height="10"></td>
          <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`;
      }
      tb.innerHTML += str;
    }
  
    // Clear input fields after submission
    website.value = "";
    username.value = "";
    email.value = "";
    password.value = "";
  };
  
  // Add password on form submission
  console.log("Working");
  showPasswords();
  document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Clicked....");
  
    let website = document.getElementById("website");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
  
    // Validation: Email is optional, but other fields are required
    if (!website.value || !username.value || !password.value) {
      alert("Please fill in all required fields (Website, Username, Password)!");
      return;
    }
  
    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];
  
    json.push({
      website: website.value,
      username: username.value,
      email: email.value || "", // Store empty string if email not entered
      password: password.value
    });
  
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
    showPasswords();
  });
  