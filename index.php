<?php
/**
* Material
* 
* @package Material Theme
* @author Nyan Kusanagi
* @version 1.0
* @link https://anohana.org
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
$this->need('header.php');
?>

<?php //ajax方式加载文章列表?>
<?php if(is_ajax()):  ?>
    <div class="post-list">
        <?php while($this->next()): ?>
            <article class="post-item" itemscope itemtype="http://schema.org/BlogPosting">
                <div class="post-main">
                    <h2 itemprop="name headline"><a itemtype="url" href="<?php $this->permalink() ?>"><?php $this->title() ?></a></h2>
                    <div class="post-content" itemprop="articleBody">
                        <?php $this->content(''); ?>
                    </div>
                </div>
                <div class="post-bottom">
                    <ul class="post-meta">
                        <li itemprop="author" itemscope itemtype="http://schema.org/Person"><i class="material-icons" alt="<?php _e('作者 '); ?>">account_circle</i> <a itemprop="name" href="<?php $this->author->permalink(); ?>" rel="author"><?php $this->author(); ?></a> </li>
                        <li><i class="material-icons" alt="<?php _e('时间 '); ?>">date_range</i> <time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('Y年m月d日'); ?></time> </li>
                        <li><i class="material-icons" alt="<?php _e('分类 '); ?>">sort</i> <?php $this->category(','); ?> </li>
                        <li itemprop="interactionCount"><i class="material-icons" alt="<?php $this->commentsNum('评论', '1 条评论', '%d 条评论'); ?>">mode_comment</i> <a itemprop="discussionUrl" href="<?php $this->permalink() ?>#comments"><?php $this->commentsNum('%d'); ?></a> </li>
                    </ul>
                    <a href="<?php $this->permalink() ?>" class="readmore" title="阅读全文" alt="阅读全文"><i class="material-icons waver dark radius">more_horiz</i></a>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
    <?php return; //完成ajax方式返回，退出此页面?>
<?php endif ?>

<div class="main">
    <div id="main-content">
        <div class="post-list">
            <?php while($this->next()): ?>
                <article class="post-item" itemscope itemtype="http://schema.org/BlogPosting">
                    <div class="post-main">
                        <h2 itemprop="name headline"><a itemtype="url" href="<?php $this->permalink() ?>"><?php $this->title() ?></a></h2>
                        <div class="post-content" itemprop="articleBody">
                            <?php $this->content(''); ?>
                        </div>
                    </div>
                    <div class="post-bottom">
                        <ul class="post-meta">
                            <li itemprop="author" itemscope itemtype="http://schema.org/Person"><i class="material-icons" alt="<?php _e('作者 '); ?>">account_circle</i> <a itemprop="name" href="<?php $this->author->permalink(); ?>" rel="author"><?php $this->author(); ?></a> </li>
                            <li><i class="material-icons" alt="<?php _e('时间 '); ?>">date_range</i> <time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date('Y年m月d日'); ?></time> </li>
                            <li><i class="material-icons" alt="<?php _e('分类 '); ?>">sort</i> <?php $this->category(','); ?> </li>
                            <li itemprop="interactionCount"><i class="material-icons" alt="<?php $this->commentsNum('评论', '1 条评论', '%d 条评论'); ?>">mode_comment</i> <a itemprop="discussionUrl" href="<?php $this->permalink() ?>#comments"><?php $this->commentsNum('%d'); ?></a> </li>
                        </ul>
                        <a href="<?php $this->permalink() ?>" class="readmore" title="阅读全文" alt="阅读全文"><i class="material-icons waver dark radius">more_horiz</i></a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    </div>
    <?php $this->need('sidebar.php'); ?>
</div><!--main结束-->
</div><!--container结束-->
<?php $this->need('footer.php'); ?>