# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


addComment = (data) ->
      $('#comments').append """
      <div class="col-6 offset-3">
        <div class="comment-wrap">
            <div class="photo">
                <div class="avatar" style="background-image: url('http://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1525202285/avatar_xcah9z.svg')"></div>
            </div>        
            <div class="comment-block">
                <p class="comment-text">#{data.message}</p>
                <div class="bottom-comment">
                    <ul class="comment-actions">
                        <li class="show"><a href="/comments/#{data.id}">Show</a></li>
                    </ul>
                </div>
            </div>
      </div>
      </div>
      """
      return

    $ ->
      $('#add_comment').on 'ajax:success', (data) ->
        $('#add_comment')[0].reset()
        addComment data.detail[0]
        return
      return