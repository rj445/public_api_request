$(document).ready(() => {
    // fetching random users
    function closeModal() {
        $(".modal-container").remove();
    }

    let users = [];
    // Close modal on click of close button
    $("body").on("click", "#modal-close-btn", function() {
        closeModal();
    });

    const showModal = function (user, index) {
        closeModal();
        const modalElement = $(`
                <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                            <p class="card-text">${user.email}</p>
                            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                            <hr>
                            <p class="modal-text">${user.phone}</p>
                            <p class="modal-text">${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                            <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>
            `);
            $("body").append(modalElement);
            $("#modal-prev").on("click", function() {
                let prevIndex = (index > 0) ? index - 1 : index;
                console.log("Prev-Index: ", prevIndex);
                if(prevIndex != -1)
                    showModal(users[prevIndex], prevIndex);
            });
            $("#modal-next").on("click", function() {
                let nextIndex = (index < users.length-1) ? index + 1: index;
                console.log("Next-INdex: ", nextIndex);
                if(nextIndex != users.length)
                    showModal(users[nextIndex], nextIndex);
            });
    }

    fetch("https://randomuser.me/api/?results=12")
    .then((response) => response.json())
    .then((data) => {
        users = data.results;
        const usersToAppend = data.results.map((user, index) => {
            let userElement = $(`
                <div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${user.picture.large}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                            <p class="card-text">${user.email}</p>
                            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                        </div>
                </div>`);
            userElement.on('click', () => {
                showModal(user, index);
            });
            return userElement;
        });
        usersToAppend.forEach((user) => {
            $("#gallery").append(user);
        });
    })
    .catch((error) => console.log(error));

    // Search Bar 
    $("#search-input").on("keyup", (event) => {
        search(event.target.value.toLowerCase());
    });

    $(".search-container form").on('submit', (event) => {
        event.preventDefault();
        search($("#search-input").val().toLowerCase());
    });
    function search(searchValue) {
        let cards = $("#gallery").children(".card");
        for(let index=0; index<cards.length; index++) {
            if($(cards[index]).find("#name").text().toLowerCase().includes(searchValue)) {
                $(cards[index]).show();
            } else {
                $(cards[index]).hide();
            }
        }
    }
});