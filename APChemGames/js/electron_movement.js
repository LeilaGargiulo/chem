document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var elementDropdown = document.getElementById('elementDropdown');
  var elementInfoDiv = document.getElementById('elementInfo');

  var elementData = {
    Hydrogen: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 1 }],
      electronConfig: "1s¹",
      funFact: "Hydrogen is the most abundant element in the universe.",
      uses: "Used in fuel cells and the production of ammonia."
    },
    Helium: {
      orbits: [{ radius: 50, speed: 0.04, electrons: 2 }],
      electronConfig: "1s²",
      funFact: "Helium has the lowest boiling point of all elements.",
      uses: "Used in cryogenics and balloons."
    },
    Lithium: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 1 }],
      electronConfig: "1s² 2s¹",
      funFact: "Lithium is widely used in rechargeable batteries.",
      uses: "Used in batteries for mobile phones and laptops."
    },
    Beryllium: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 2 }],
      electronConfig: "1s² 2s²",
      funFact: "Beryllium is lightweight but strong.",
      uses: "Used in aerospace materials."
    },
    Boron: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 3 }],
      electronConfig: "1s² 2s² 2p¹",
      funFact: "Boron compounds are used in detergents.",
      uses: "Used in borosilicate glass and insecticides."
    },
    Carbon: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 4 }],
      electronConfig: "1s² 2s² 2p²",
      funFact: "Carbon is the basis of organic life.",
      uses: "Used in fuels, plastics, and steel."
    },
    Nitrogen: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 5 }],
      electronConfig: "1s² 2s² 2p³",
      funFact: "Nitrogen makes up 78% of the Earth's atmosphere.",
      uses: "Used in fertilizers and explosives."
    },
    Oxygen: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 6 }],
      electronConfig: "1s² 2s² 2p⁴",
      funFact: "Oxygen is essential for respiration.",
      uses: "Used in medical respiratory therapy and steelmaking."
    },
    Fluorine: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 7 }],
      electronConfig: "1s² 2s² 2p⁵",
      funFact: "Fluorine is the most reactive of all elements.",
      uses: "Used in toothpaste and Teflon."
    },
    Neon: {
      orbits: [{ radius: 50, speed: 0.05, electrons: 2 }, { radius: 80, speed: 0.02, electrons: 8 }],
      electronConfig: "1s² 2s² 2p⁶",
      funFact: "Neon lights are famous in advertising signs.",
      uses: "Used in neon signs and high-voltage indicators."
    },
    // Additional elements can be added here...
  };

  // Initialize currentElement with the value from the dropdown (ensure casing matches keys above)
  var currentElement = elementDropdown.value;
  var angle = 0;

  // Function to update the info box for the selected element.
  function updateElementDisplay() {
    // Log for debugging – check the console to verify the selected element's value
    console.log("Selected element:", currentElement);

    var element = elementData[currentElement];
    if(element) {
      elementInfoDiv.innerHTML = "<strong>" + currentElement + "</strong><br>" +
                                 "Electron Configuration: " + element.electronConfig + "<br>" +
                                 "Fun Fact: " + element.funFact + "<br>" +
                                 "Uses: " + element.uses;
    } else {
      // Fallback if element is not found – this also helps with debugging.
      elementInfoDiv.innerHTML = "No data found for " + currentElement + ". Please check your elementData.";
    }
  }

  // Drawing function that updates continuously.
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw nucleus (always shown)
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#f44336';
    ctx.fill();

    // Retrieve element data (or fallback to an empty config so drawing continues)
    var element = elementData[currentElement];
    if (element && element.orbits) {
      element.orbits.forEach(function(orbit) {
        // Draw orbit circle
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, orbit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#9e9e9e';
        ctx.stroke();
        // Draw electrons on this orbit
        for (var i = 0; i < orbit.electrons; i++) {
          var electronAngle = angle * orbit.speed + (i * (2 * Math.PI / orbit.electrons));
          var x = canvas.width/2 + orbit.radius * Math.cos(electronAngle);
          var y = canvas.height/2 + orbit.radius * Math.sin(electronAngle);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#2196f3';
          ctx.fill();
        }
      });
    }
    angle += 1;
    requestAnimationFrame(draw);
  }

  // Initial display update and drawing
  updateElementDisplay();
  draw();

  // When the dropdown value changes, update the current element and the info box.
  elementDropdown.addEventListener('change', function() {
    currentElement = this.value;
    updateElementDisplay();
  });
});
