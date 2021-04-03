class TimesheetsController < ApplicationController
  def index
    @timesheets = Timesheet.page(params[:page]).per(20)
    render json: {
      timesheets: @timesheets,
      page: @timesheets.current_page,
      pages: @timesheets.total_pages
    }
  end
end