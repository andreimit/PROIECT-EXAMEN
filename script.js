//Adaugam EventListener pentru a putea activa butonul de Calculate 

  document.querySelector(".calculate").addEventListener("click", function () {
  
    //Hide output
  document.getElementById("value").style.display = "none";
  
  //Afisam loaderul
  document.querySelector(".loading").style.display = "block";

  setTimeout(BMI, 2000);
});

//Clear EventListener
document.querySelector(".clear").addEventListener("click", Clear);

// BMI Calculation Function
function BMI() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  // Formula de calcul
  let index = weight / (((height / 100) * height) / 100).toFixed(0);

  const value = document.getElementById("value");
  const explanation = document.getElementById("explanation");
  value.innerHTML = "Your BMI is: " + index;

  //Ascundem Output-ul si Loader-ul timp de 2 secunde
  document.getElementById("value").style.display = "block";
  document.querySelector(".loading").style.display = "none";



  const calculateStatus = (calculatedIndex) => {
    let status = "";

    // Cu switch-ul vom returna un singur key
    // Din map o sa citim key-ul
    // Creez o conditie care sa verifice daca inaltimea si greutatea nu sunt egale cu 0
    switch (height && weight != 0) {
      case index < 15:
        status = "extreme_underweight";
        break;
      case index < 16:
        status = "severely_underwright";
        break;
      case index < 18.5:
        status = "underweight";
        break;
      case index < 25:
        status = "normal";
        break;
      case index < 30:
        status = "overweight";
        break;
      case index < 35:
        status = "obese_1";
        break;
      case index < 40:
        status = "obese_2";
        break;
      case index < 45:
        status = "obsese_3";
        break;

      default:
        error();

        function error() {
          //Ascundem Output-ul si Loader-ul
          document.getElementById("value").style.display = "block";
          document.querySelector(".loading").style.display = "none";
          
          //Afisam mesajul de eroare
          document.getElementById("value").innerHTML =
            "Please enter a valid height and weight!";
          
          //Afisam mesajul de eroare pentru 5 secunde
            setTimeout(() => {
            document.getElementById("value").innerHTML = "";
            document.querySelector(".loading").innerHTML = "";
          }, 5000);
        }
    }

    // Returnam key-ul
    return status;
  };

  //Variabila currentStatus va lua valoarea functiei calculateStatus
  const currentStatus = calculateStatus(index);

  //Map pentru a putea afisa mesajul corespunzator BMI-ului
  const mappedInformation = {
    extreme_underweight: {
      color: "red",
      message: "Very severly underweight, please consult a nutritionist!",
    },
    severely_underwright: {
      color: "red",
      message: "Severly underweight, you need more calories!",
    },
    underweight: {
      color: "yellow",
      message: "You're underweight!",
    },
    normal: {
      color: "green",
      message: "You are just fine",
    },
    overweight: {
      color: "orange",
      message: "You are a little bit overweight",
    },
    obese_1: {
      color: "red",
      message: "Obese Class I",
    },
    obese_2: {
      color: "purple",
      message: "Obese Class II",
    },
    obsese_3: {
      color: "purple",
      message: "Obese Class III",
    },
  };

  // Se afiseaza mesajul dinamic in functie de resultat
  const showMessage = (calculatedStatus) => {
    const result = mappedInformation[calculatedStatus];

    explanation.innerHTML = `<span style='color:${result.color}';>${result.message}</span>`;
  };


// Se afiseaza in explanation.innerHTML
  showMessage(currentStatus);

  // Pregatim datele pentru save
  const dataToSave = {
    statistics: [
      {
        date: new Date(),
        index: index,
        status: currentStatus,
      },
    ],
  };

  // Read from local storage if exists 
  const existingData = JSON.parse(localStorage.getItem("application-bmi"));


  if( existingData?.statistics.length ) {
    // save if already exists - atunci cand mai exista
    localStorage.setItem("application-bmi", JSON.stringify({
        statistics: [
            ...existingData.statistics,
            ...dataToSave.statistics
        ],
    }));
  }
  else {
  // save in local storage first time - doar pentru prima data 
  localStorage.setItem("application-bmi", JSON.stringify(dataToSave));
  }
}

//Functia de Clear pentru Output si State

function Clear() {
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("value").innerHTML = "";
  document.getElementById("explanation").innerHTML = "";
}
