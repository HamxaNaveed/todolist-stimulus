class TasksController < ApplicationController
  def index
    @tasks = Task.all
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      redirect_to tasks_path # Replace `tasks_path` with the appropriate URL for your application
    else
      # Handle failed save, if necessary
      render :new
    end
  end

  def complete
    @task = Task.find(params[:id])
    if @task.update(completed: true)
      render json: { success: true, task: @task }
    else
      render json: { success: false, error: "Failed to mark task as completed" }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @task = Task.find(params[:id])
    if @task.destroy
      render json: { success: true, message: "Task deleted successfully" }
    else
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end
  end
  

  private

  def task_params
    params.require(:task).permit(:task, :completed)
  end
end
