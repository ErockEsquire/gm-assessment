class TimesheetsController < ApplicationController
  def index
    @timesheets = Timesheet.page(params[:page]).per(20)
    render json: {
      timesheets: @timesheets,
      page: @timesheets.current_page,
      pages: @timesheets.total_pages
    }
  end

  def create
    client = Client.create_or_find_by!(name: params[:client])
    project = Project.create_or_find_by!(name: params[:projectName], code: params[:projectCode], client_id: client.id)
    Timesheet.create!(hours: params[:hours], billable: params[:billable], billableHours: params[:billableHours],
                      billable_rate: params[:billableRate], date: params[:date], first_name: params[:firstName], last_name: params[:lastName], hours: params[:hours], client_id: client.id, project_id: project.id)
  end
end
