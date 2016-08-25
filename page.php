<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php $this->need('header.php'); ?>
<?php //ajax方式加载文章?>
<?php if(is_ajax()):  ?>
        <div class="post-comments-container">
            <article class="post" itemscope itemtype="http://schema.org/BlogPosting">
                <div class="post-main">
                    <h2 itemprop="name headline"><?php $this->title() ?></h2>
                    <div class="post-content" itemprop="articleBody">
                        <?php $this->content(); ?>
                    </div>
                </div>
            </article>
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
                    <div class="post-content" itemprop="articleBody">
                        <?php $this->content(); ?>
                    </div>
                </div>
            </article>
            <?php $this->need('comments.php'); ?>
        </div>
    </div>
    <?php $this->need('sidebar.php'); ?>
</div><!--main结束-->
</div><!--container结束-->
<?php $this->need('footer.php'); ?>
