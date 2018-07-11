$(document).on 'turbolinks:load', ->
# $(document).on 'ready page:change', ->
  $navbarBurgers = Array::slice.call(document.querySelectorAll('.navbar-burger'), 0)
  if $navbarBurgers.length > 0
    $navbarBurgers.forEach ($el) ->
      $el.addEventListener 'click', ->
        target = $el.dataset.target
        $target = document.getElementById(target)
        $el.classList.toggle 'is-active'
        $target.classList.toggle 'is-active'
        return
      return
return