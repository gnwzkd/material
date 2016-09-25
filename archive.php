<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php $this->need('header.php'); ?>

<?php //ajax方式加载文章列表?>
<?php if(is_ajax()):  ?>
    <h3 class="archive-title"><?php $this->archiveTitle(array(
        'category'  =>  _t('分类 %s 下的文章'),
        'search'    =>  _t('包含关键字 %s 的文章'),
        'tag'       =>  _t('标签 %s 下的文章'),
        'author'    =>  _t('%s 发布的文章')
        ), '', ''); ?></h3>
    <div class="post-list">
            <?php if ($this->have()): ?>
                <?php while($this->next()): ?>
                    <article class="post-item" itemscope itemtype="http://schema.org/BlogPosting">
                        <div class="post-main">
                            <h2 itemprop="name headline"><a itemscope itemtype="http://schema.org/url" href="<?php $this->permalink() ?>"><?php $this->title() ?></a></h2>
                            <div class="post-content" itemprop="articleBody">
                                <?php $this->content(); ?>
                            </div>
                        </div>
                        <div class="post-bottom">
                            <ul class="post-meta">
                                <li itemprop="author" itemscope itemtype="http://schema.org/Person"><i class="material-icons">account_circle</i> <a itemprop="name" href="<?php $this->author->permalink(); ?>" rel="author"><?php $this->author(); ?></a> </li>
                                <li><i class="material-icons">date_range</i> <time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('Y年m月d日'); ?></time> </li>
                                <li><i class="material-icons">sort</i> <?php $this->category(','); ?> </li>
                                <li itemprop="interactionCount"><i class="material-icons">mode_comment</i> <a itemprop="discussionUrl" href="<?php $this->permalink() ?>#comments"><?php $this->commentsNum('%d'); ?></a> </li>
                            </ul>
                            <a href="<?php $this->permalink() ?>" class="readmore" title="阅读全文"><i class="material-icons waver dark radius">more_horiz</i></a>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php else: ?>
                <section class="post">
                    <div class="post-main">
                    <h2 class="post-title"><?php _e('没有找到内容'); ?></h2>
                    </div>
                </section>
            <?php endif; ?>
        </div>
    <?php return; //完成ajax方式返回，退出此页面?>
<?php endif ?>

<div class="main">
    <div id="main-content">
        <h3 class="archive-title"><?php $this->archiveTitle(array(
            'category'  =>  _t('分类 %s 下的文章'),
            'search'    =>  _t('包含关键字 %s 的文章'),
            'tag'       =>  _t('标签 %s 下的文章'),
            'author'    =>  _t('%s 发布的文章')
            ), '', ''); ?></h3>
        <div class="post-list">
                <?php if ($this->have()): ?>
                    <?php while($this->next()): ?>
                        <article class="post-item" itemscope itemtype="http://schema.org/BlogPosting">
                            <div class="post-main">
                                <h2 itemprop="name headline"><a itemscope itemtype="http://schema.org/url" href="<?php $this->permalink() ?>"><?php $this->title() ?></a></h2>
                                <div class="post-content" itemprop="articleBody">
                                    <?php $this->content(); ?>
                                </div>
                            </div>
                            <div class="post-bottom">
                                <ul class="post-meta">
                                    <li itemprop="author" itemscope itemtype="http://schema.org/Person"><i class="material-icons">account_circle</i> <a itemprop="name" href="<?php $this->author->permalink(); ?>" rel="author"><?php $this->author(); ?></a> </li>
                                    <li><i class="material-icons">date_range</i> <time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('Y年m月d日'); ?></time> </li>
                                    <li><i class="material-icons">sort</i> <?php $this->category(','); ?> </li>
                                    <li itemprop="interactionCount"><i class="material-icons">mode_comment</i> <a itemprop="discussionUrl" href="<?php $this->permalink() ?>#comments"><?php $this->commentsNum('%d'); ?></a> </li>
                                </ul>
                                <a href="<?php $this->permalink() ?>" class="readmore" title="阅读全文"><i class="material-icons waver dark radius">more_horiz</i></a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                <?php else: ?>
                    <section class="post">
                        <div class="post-main">
                        <h2 class="post-title"><?php _e('没有找到内容'); ?></h2>
                        </div>
                    </section>
                <?php endif; ?>
            </div>
        </div>
        <?php $this->need('sidebar.php'); ?>
    </div><!--main结束-->
</div><!--container结束-->
<?php $this->need('footer.php'); ?>
