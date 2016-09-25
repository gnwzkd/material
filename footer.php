<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<div id="float-layer"></div>
<div class="loader">
    <svg class="spinner" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <circle class="path" fill="none" stroke-width="3" stroke-linecap="round" cx="12" cy="12" r="10"></circle>
   </svg>
</div>
<div id="float-notify"></div>
<div id="light-box">
    <div class="close waver light radius"><i class="material-icons">arrow_back</i></div>
    <div class="prev waver light radius"><i class="material-icons">keyboard_arrow_left</i></div>
    <div class="next waver light radius"><i class="material-icons">keyboard_arrow_right</i></div>
    <img id="zoom-img" src="" alt="zoom-img">
</div>
<?php $this->footer(); ?>
</body>
</html>
