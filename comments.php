<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php function threadedComments($comments, $options) {
    $commentClass = '';
    if ($comments->authorId) {
        if ($comments->authorId == $comments->ownerId) {
            $commentClass .= ' comment-by-author';
        } else {
            $commentClass .= ' comment-by-user';
        }
    }
    $commentLevelClass = $comments->levels > 0 ? ' comment-child' : ' comment-parent';
    ?>
    <li itemscope itemtype="http://schema.org/UserComments" id="li-<?php $comments->theId(); ?>" class="comment-body<?php 
        if ($comments->levels > 0) {
            echo ' comment-child';
            $comments->levelsAlt(' comment-level-odd', ' comment-level-even');
        } else {
            echo ' comment-parent';
        }
        $comments->alt(' comment-odd', ' comment-even');
        echo $commentClass;
        ?>">
        <div id="<?php $comments->theId(); ?>" class="comment-author">
            <span itemprop="image" class="author-avatar"><?php $comments->gravatar('48', ''); ?></span>
            <cite itemprop="name" class="author-id"><?php $comments->author(); ?></cite>
            <span class="comment-reply">
                <a href="javascript:void(0)" rel="nofollow" data-theid="<?php $comments->theId(); ?>">回复</a>
                <!-- <?php $comments->reply(); ?> -->
            </span>
            <div itemprop="commentText" class="comment-content"><?php $comments->content(); ?></div>
            <a class="comment-time" href="<?php $comments->permalink(); ?>"><time itemprop="commentTime" datetime="<?php $comments->date('c'); ?>"><?php $comments->date('Y-m-d H:i'); ?></time></a>
            <div class="clearfix"></div>
        </div><!-- 单条评论者信息及内容 -->
        <?php if ($comments->children) { ?>
            <div class="comment-children">
                <?php $comments->threadedComments($options); ?>
            </div>
            <?php } ?>
        </li>
        <?php } ?>

        <div id="comments" class="clearfix">
            <?php $this->comments()->to($comments); ?>
            <?php if ($comments->have()): ?>
             <h3 class="comment-title"><?php $this->commentsNum(_t('暂无评论'), _t('仅有一条评论'), _t('已有 %d 条评论')); ?></h3>
             <?php $comments->listComments(); ?>
             <div style="display:none"><?php $comments->pageNav('&laquo; 前一页', '后一页 &raquo;'); ?></div>
         <?php endif; ?>
         <?php if($this->allow('comment')): ?>
            <div id="<?php $this->respondId(); ?>" class="respond hide">
                <span id="close-reply" class="waver dark radius"><i class="material-icons">arrow_back</i></span>
                <div class="cancel-comment-reply">
                    <?php $comments->cancelReply(); ?>
                </div>
                <form method="post" action="<?php $this->commentUrl() ?>" id="comment-form" role="form">
                    <?php if($this->user->hasLogin()): ?>
                      <p class="logged-meta"><a class="logged-id" href="<?php $this->options->profileUrl(); ?>"><?php $this->author->gravatar('36','');$this->user->screenName(); ?></a> <a class="logout waver dark radius" href="<?php $this->options->logoutUrl(); ?>" title="Logout"><i class="material-icons">exit_to_app</i></a></p>
                  <?php else: ?>
                    <div id="respond-head">
                        <img src="//www.gravatar.com/avatar/" alt="评论头像" id="inst-ava">
                        <span id="head-toggle" class="waver dark radius"><i class="material-icons">keyboard_arrow_up</i></span>
                        <div class="respond-meta">
                            <i class="material-icons">account_circle</i><input type="text" name="author" id="author" class="text" value="<?php $this->remember('author'); ?>" required placeholder="称呼"/>
                            <i class="material-icons">email</i><input type="email" name="mail" id="mail" class="text" value="<?php $this->remember('mail'); ?>"<?php if ($this->options->commentsRequireMail): ?> required<?php endif; ?> placeholder="邮箱"/>
                            <i class="material-icons">language</i><input type="url" name="url" id="url" class="text" value="<?php $this->remember('url'); ?>"<?php if ($this->options->commentsRequireURL): ?> required<?php endif; ?> placeholder="网站"/>
                        </div>
                        <p id="recorded-id"></p>
                    </div>
                <?php endif; ?>
                <div class="textarea-container <?php if($this->user->hasLogin()): _e(' unfold'); endif; ?>">
                    <textarea rows="8" cols="50" name="text" id="textarea" class="textarea" required ><?php $this->remember('text'); ?></textarea>
                    <div id="face-panel" class="hide">
                        <button class="u1f609" data-code="1f609"></button>
                        <button class="u1f60a" data-code="1f60a"></button>
                        <button class="u1f60c" data-code="1f60c"></button>
                        <button class="u1f60d" data-code="1f60d"></button>
                        <button class="u1f60e" data-code="1f60e"></button>
                        <button class="u1f60f" data-code="1f60f"></button>
                        <button class="u1f61a" data-code="1f61a"></button>
                        <button class="u1f61b" data-code="1f61b"></button>
                        <button class="u1f61c" data-code="1f61c"></button>
                        <button class="u1f61d" data-code="1f61d"></button>
                        <button class="u1f61e" data-code="1f61e"></button>
                        <button class="u1f61f" data-code="1f61f"></button>
                        <button class="u1f62a" data-code="1f62a"></button>
                        <button class="u1f62b" data-code="1f62b"></button>
                        <button class="u1f62c" data-code="1f62c"></button>
                        <button class="u1f62d" data-code="1f62d"></button>
                        <button class="u1f62e" data-code="1f62e"></button>
                        <button class="u1f62f" data-code="1f62f"></button>
                        <button class="u1f64b" data-code="1f64b"></button>
                        <button class="u1f64c" data-code="1f64c"></button>
                        <button class="u1f64d" data-code="1f64d"></button>
                        <button class="u1f64e" data-code="1f64e"></button>
                        <button class="u1f64f" data-code="1f64f"></button>
                        <button class="u1f600" data-code="1f600"></button>
                        <button class="u1f601" data-code="1f601"></button>
                        <button class="u1f602" data-code="1f602"></button>
                        <button class="u1f603" data-code="1f603"></button>
                        <button class="u1f604" data-code="1f604"></button>
                        <button class="u1f605" data-code="1f605"></button>
                        <button class="u1f606" data-code="1f606"></button>
                        <button class="u1f607" data-code="1f607"></button>
                        <button class="u1f608" data-code="1f608"></button>
                        <button class="u1f60b" data-code="1f60b"></button>
                        <button class="u1f610" data-code="1f610"></button>
                        <button class="u1f611" data-code="1f611"></button>
                        <button class="u1f612" data-code="1f612"></button>
                        <button class="u1f613" data-code="1f613"></button>
                        <button class="u1f614" data-code="1f614"></button>
                        <button class="u1f615" data-code="1f615"></button>
                        <button class="u1f616" data-code="1f616"></button>
                        <button class="u1f617" data-code="1f617"></button>
                        <button class="u1f618" data-code="1f618"></button>
                        <button class="u1f619" data-code="1f619"></button>
                        <button class="u1f620" data-code="1f620"></button>
                        <button class="u1f621" data-code="1f621"></button>
                        <button class="u1f622" data-code="1f622"></button>
                        <button class="u1f623" data-code="1f623"></button>
                        <button class="u1f624" data-code="1f624"></button>
                        <button class="u1f625" data-code="1f625"></button>
                        <button class="u1f626" data-code="1f626"></button>
                        <button class="u1f627" data-code="1f627"></button>
                        <button class="u1f628" data-code="1f628"></button>
                        <button class="u1f629" data-code="1f629"></button>
                        <button class="u1f630" data-code="1f630"></button>
                        <button class="u1f631" data-code="1f631"></button>
                        <button class="u1f632" data-code="1f632"></button>
                        <button class="u1f633" data-code="1f633"></button>
                        <button class="u1f634" data-code="1f634"></button>
                        <button class="u1f635" data-code="1f635"></button>
                        <button class="u1f636" data-code="1f636"></button>
                        <button class="u1f637" data-code="1f637"></button>
                        <button class="u1f645" data-code="1f645"></button>
                        <button class="u1f646" data-code="1f646"></button>
                        <button class="u1f647" data-code="1f647"></button>
                    </div>
                </div>
                <ul id="format-emoji">
                    <li><i id="face-panel-switch" class="material-icons waver dark radius" data-format="faces">tag_faces</i></li>
                    <li><i class="material-icons waver dark radius" data-format="bold">format_bold</i></li>
                    <li><i class="material-icons waver dark radius" data-format="italic">format_italic</i></li>
                    <li><i class="material-icons waver dark radius" data-format="strike">format_strikethrough</i></li>
                </ul>
                <button type="submit" id="submit" class="submit waver dark radius"><i class="material-icons">send</i></button>
            </form>
        </div>
    <?php else: ?>
        <h3><?php _e('评论已关闭'); ?></h3>
    <?php endif; ?>
</div>
<button class="waver light radius" id="open-comment"><i class="material-icons">mode_comment</i></button>