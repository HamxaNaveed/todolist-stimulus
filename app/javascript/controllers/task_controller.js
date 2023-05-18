import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output"];

  connect() {
    console.log("Task Controller connected");
  }

  create(event) {
    event.preventDefault(); 

    const form = event.currentTarget;
    const formData = new FormData(form);
    const taskText = formData.get("task");

    if (taskText.trim() !== "") {
      fetch("/tasks", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${taskText}</td>
            <td>
              <button class="btn btn-success" data-action="click->task#complete" data-task-id="${data.id}">
                Mark as Completed
              </button>
            </td>
            <td>
              <button class="btn btn-danger" data-action="click->task#remove" data-task-id="${data.id}">
                Remove
              </button>
            </td>
          `;

          this.outputTarget.appendChild(newRow);

          form.reset();
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  }

  complete(event) {
    const completedButton = event.target;
    const button = completedButton.dataset.taskId;
    const taskId = event.currentTarget.dataset.taskId;
    console.log(taskId);
    fetch(`/tasks/${taskId}/complete`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        completedButton.classList.remove("btn");
        completedButton.classList.remove("btn-secondary");

        completedButton.classList.add("btn", "btn-success");

        completedButton.textContent = "Completed";

      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  remove(event) {
    const taskId = event.currentTarget.dataset.taskId;
  
    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const taskRow = event.target.closest("tr");
        console.log(taskRow);
        taskRow.remove();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }
  
}
