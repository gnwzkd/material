<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<div class="sidebar">
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowRecentPosts', $this->options->sidebarBlock)): ?>
        <section class="widget sidebar-new-article">
            <h3 class="widget-title"><?php _e('最新文章'); ?></h3>
            <ul class="widget-list">
                <?php $this->widget('Widget_Contents_Post_Recent')
                ->parse('<li><i class="material-icons">subject</i> <a href="{permalink}">{title}</a></li>'); ?>
            </ul>
        </section>
    <?php endif; ?>
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowRecentComments', $this->options->sidebarBlock)): ?>
        <section class="widget sidebar-new-comments">
            <h3 class="widget-title"><?php _e('最近回复'); ?></h3>
            <ul class="widget-list">
                <?php $this->widget('Widget_Comments_Recent')->to($comments); ?>
                <?php while($comments->next()): ?>
                    <li class="sidebar-comments"><?php $comments->gravatar("32"); ?><a href="<?php $comments->permalink(); ?>"><?php $comments->author(false); ?></a><p><?php $comments->excerpt(35, '...'); ?></p></li>
                <?php endwhile; ?>
            </ul>
        </section>
    <?php endif; ?>
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowCategory', $this->options->sidebarBlock)): ?>
        <section class="widget sidebar-category">
            <h3 class="widget-title"><?php _e('分类'); ?></h3>
            <?php $this->widget('Widget_Metas_Category_List')->listCategories('wrapClass=widget-list'); ?>
        </section>
    <?php endif; ?>
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowArchive', $this->options->sidebarBlock)): ?>
        <section class="widget sidebar-archive">
            <h3 class="widget-title"><?php _e('归档'); ?></h3>
            <ul class="widget-list">
                <?php $this->widget('Widget_Contents_Post_Date', 'type=month&format=Y年m月')
                ->parse('<li><i class="material-icons">archive</i> <a href="{permalink}">{date}</a></li>'); ?>
            </ul>
        </section>
    <?php endif; ?>
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowLinks', $this->options->sidebarBlock)): ?>
    <section class="widget sidebar-links">
        <h3 class="widget-title"><?php _e('友链'); ?></h3>
        <ul class="widget-list">
            <?php Links_Plugin::output($pattern='<li><img src="{image}" alt="{title}"><a href="{url}" target="_blank">{name}</a><q>{title}</q></li>', $links_num=0, $sort=NULL); ?>
        </ul>
    </section>
    <?php endif; ?>
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowOther', $this->options->sidebarBlock)): ?>
        <section class="widget sidebar-other">
            <h3 class="widget-title"><?php _e('其它'); ?></h3>
            <ul class="widget-list">
                <?php if($this->user->hasLogin()): ?>
                    <li class="last"><i class="material-icons">settings</i> <a target="_blank" data-noajax="true" href="<?php $this->options->adminUrl(); ?>"><?php _e('进入后台'); ?> (<?php $this->user->screenName(); ?>)</a></li>
                    <li><i class="material-icons">exit_to_app</i> <a target="_blank" data-noajax="true" href="<?php $this->options->logoutUrl(); ?>"><?php _e('退出'); ?></a></li>
                <?php else: ?>
                    <li class="last"><i class="material-icons">perm_identity</i> <a target="_blank" data-noajax="true" href="<?php $this->options->adminUrl('login.php'); ?>"><?php _e('登录'); ?></a></li>
                <?php endif; ?>
                <li><i class="material-icons">rss_feed</i> <a target="_blank" data-noajax="true" href="<?php $this->options->feedUrl(); ?>"><?php _e('文章 RSS'); ?></a></li>
                <li><i class="material-icons">rss_feed</i> <a target="_blank" data-noajax="true" href="<?php $this->options->commentsFeedUrl(); ?>"><?php _e('评论 RSS'); ?></a></li>
            </ul>
        </section>
    <?php endif; ?>
</div><!--sidebar结束-->
<div class="clearfix"></div>