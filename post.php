<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php $this->need('header.php'); ?>

<?php //ajax方式加载文章?>
<?php if(is_ajax()):  ?>
    <div class="post-comments-container">
        <article class="post" itemscope itemtype="http://schema.org/BlogPosting">
            <div class="post-main">
                <h2 itemprop="name headline"><?php $this->title() ?></h2>
                <ul class="post-meta">
                    <li itemprop="author" itemscope itemtype="http://schema.org/Person"><i class="material-icons" alt="<?php _e('作者 '); ?>">account_circle</i> <a itemprop="name" href="<?php $this->author->permalink(); ?>" rel="author"><?php $this->author(); ?></a> </li>
                    <li><i class="material-icons" alt="<?php _e('时间 '); ?>">date_range</i> <time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('Y年m月d日'); ?></time> </li>
                    <li><i class="material-icons" alt="<?php _e('分类 '); ?>">sort</i> <?php $this->category(','); ?> </li>
                    <li itemprop="interactionCount"><i class="material-icons" alt="<?php $this->commentsNum('评论', '1 条评论', '%d 条评论'); ?>">mode_comment</i> <a itemprop="discussionUrl" href="<?php $this->permalink() ?>#comments"><?php $this->commentsNum('%d'); ?></a> </li>
                </ul>
                <div class="post-content" itemprop="articleBody">
                    <?php $this->content(); ?>
                </div>
            </div>
            <div class="post-bottom">
                <p itemprop="keywords" class="tags"><i alt="<?php _e('标签 '); ?>" class="material-icons">label</i> <?php $this->tags(', ', true, 'none'); ?> </p>
            </div>
        </article>
        <ul class="post-near">
            <li class="prev-post"><a href="<?php xmPrevNext("pre",$this,1); ?>"><i class="material-icons waver dark radius">keyboard_arrow_left</i><span><?php xmPrevNext("pre",$this,0); ?></span></a></li>
            <li class="next-post"><a href="<?php xmPrevNext("next",$this,1); ?>"><span><?php xmPrevNext("next",$this,0); ?></span><i class="material-icons waver dark radius">keyboard_arrow_right</i></a></li>
        </ul>
        <?php $this->need('comments.php'); ?>
    </div>
    <?php return; //完成ajax方式返回，退出此页面?>
<?php endif ?>

<div class="main">
    <div id="main-content">
        <div class="post-comments-container">
            <article class="post" itemscope itemtype="http://schema.org/BlogPosting">
                <div class="post-main">
                    <h2 itemprop="name headline"><?php $this->title() ?></h2>
                    <ul class="post-meta">
                        <li itemprop="author" itemscope itemtype="http://schema.org/Person"><i class="material-icons" alt="<?php _e('作者 '); ?>">account_circle</i> <a itemprop="name" href="<?php $this->author->permalink(); ?>" rel="author"><?php $this->author(); ?></a> </li>
                        <li><i class="material-icons" alt="<?php _e('时间 '); ?>">date_range</i> <time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('Y年m月d日'); ?></time> </li>
                        <li><i class="material-icons" alt="<?php _e('分类 '); ?>">sort</i> <?php $this->category(','); ?> </li>
                        <li itemprop="interactionCount"><i class="material-icons" alt="<?php $this->commentsNum('评论', '1 条评论', '%d 条评论'); ?>">mode_comment</i> <a itemprop="discussionUrl" href="<?php $this->permalink() ?>#comments"><?php $this->commentsNum('%d'); ?></a> </li>
                    </ul>
                    <div class="post-content" itemprop="articleBody">
                        <?php $this->content(); ?>
                    </div>
                </div>
                <div class="post-bottom">
                    <p itemprop="keywords" class="tags"><i alt="<?php _e('标签 '); ?>" class="material-icons">label</i> <?php $this->tags(', ', true, 'none'); ?> </p>
                </div>
            </article>
            <ul class="post-near">
                <li class="prev-post"><a href="<?php xmPrevNext("pre",$this,1); ?>"><i class="material-icons waver dark radius">keyboard_arrow_left</i><span><?php xmPrevNext("pre",$this,0); ?></span></a></li>
                <li class="next-post"><a href="<?php xmPrevNext("next",$this,1); ?>"><span><?php xmPrevNext("next",$this,0); ?></span><i class="material-icons waver dark radius">keyboard_arrow_right</i></a></li>
            </ul>
            <?php $this->need('comments.php'); ?>
        </div>
    </div>
    <?php $this->need('sidebar.php'); ?>
</div><!--main结束-->
</div><!--container结束-->
<?php $this->need('footer.php'); ?>
