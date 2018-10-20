class DiscussionsController < ApplicationController
  before_action :set_discussion, only: [:show, :edit, :update, :destroy]
  before_action :find_channels, only: [:index, :show, :new, :edit]
  before_action :authenticate_user!, except: [:index, :show, :splash, :create]
	before_action :initialize_user

  def initialize_user
    @discussion = Discussion.new
  end


  # GET /discussions
  # GET /discussions.json
  def index
    @discussions = Discussion.all.order(discussion[:created_at].desc)
  end

	def splash
		 @comments = Comment.all
    @comment = Comment.new # add this line
		@channels = Channel.all
	end

  # GET /discussions/1
  # GET /discussions/1.json
  def show
    @discussions = Discussion.all.order(discussion[:created_at].desc)
  end

  # GET /discussions/new
  def new
    @discussion = current_user.discussions.build
  end

  # GET /discussions/1/edit
  def edit
  end

  # POST /discussions
  # POST /discussions.json
  def create
    @discussion = current_user.discussions.build(discussion_params)

    respond_to do |format|
      if @discussion.save
        format.html { redirect_to @discussion, notice: 'Discussion was successfully created.' }
        format.json { render :show, status: :created, location: @discussion }
      else
        format.html { render :new }
        format.json { render json: @discussion.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /discussions/1
  # PATCH/PUT /discussions/1.json
  def update
    respond_to do |format|
      if @discussion.update(discussion_params)
        format.html { redirect_to @discussion, notice: 'Discussion was successfully updated.' }
        format.json { render :show, status: :ok, location: @discussion }
      else
        format.html { render :edit }
        format.json { render json: @discussion.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /discussions/1
  # DELETE /discussions/1.json
  def destroy
    @discussion.destroy
    respond_to do |format|
      format.html { redirect_to discussions_url, notice: 'Discussion was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  def search
    @search_terms = params[:text]
    @discussions = Discussion.where(discussion[:title].matches("%#{@search_terms}%")).or(
                   Discussion.where(discussion[:content].matches("%#{@search_terms}%")))
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_discussion
    @discussion = Discussion.find(params[:id])
  end

  def find_channels
    @channels = Channel.all.order(channel[:created_at].desc)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def discussion_params
    params.require(:discussion).permit(:title, :content, :channel_id)
  end

  # def discussions_from_params
  #   if params[:title]
  #     Discussion.where(discussion[:title].matches("%#{params[:title]}%"))
  #   else
  #     Discussion.all
  #   end
  # end

  def discussion
    Discussion.arel_table
  end

  def channel
    Channel.arel_table
  end
end
