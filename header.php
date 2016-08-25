<?php?>
<?php if(is_ajax()):  ?>
    <?php return;?>
<?php endif ?>
<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="<?php $this->options->charset(); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title><?php $this->archiveTitle(array(
        'category'  =>  _t('分类 %s 下的文章'),
        'search'    =>  _t('包含关键字 %s 的文章'),
        'tag'       =>  _t('标签 %s 下的文章'),
        'author'    =>  _t('%s 发布的文章')
        ), '', ' - '); ?><?php $this->options->title(); ?>
    </title>
    <link rel="stylesheet" href="<?php $this->options->themeUrl('/css/style.css'); ?>" type="text/css">
    <script type="text/javascript" src="<?php $this->options->themeUrl('/js/script.js'); ?>"></script>
    <!-- 通过自有函数输出HTML头部信息 -->
    <?php $this->header('commentReply='); ?>
    <meta name="theme-color" id="theme-color" content="#00bcd4" />
</head>
<body class="color-cyan">
    <div class="side-nav">
        <a href="<?php $this->options->siteUrl(); ?>" class="logo" alt=>
            <?php if ($this->options->logoUrl): ?>
                <img src="<?php $this->options->logoUrl() ?>" alt="<?php $this->options->title() ?>" />
            <?php endif; ?>
            <?php $this->options->title() ?>
        </a>
        <nav >
            <a class="waver dark home<?php if($this->is('index')): _e(' current'); endif; ?>" href="<?php $this->options->siteUrl(); ?>"  title="首页"><?php _e('首页'); ?></a>
            <?php $this->widget('Widget_Contents_Page_List')->to($pages); ?>
            <?php while($pages->next()): ?>
                <a class="waver dark <?php $pages->slug(); if($this->is('page', $pages->slug)): _e(' current'); endif; ?>" href="<?php $pages->permalink(); ?>" title="<?php $pages->title(); ?>"><?php $pages->title(); ?></a>
            <?php endwhile; ?>
        </nav>
        <div class="site-info" role="contentinfo">
            &copy; <?php echo date('Y'); ?> <a href="<?php $this->options->siteUrl(); ?>"><?php $this->options->title(); ?></a><br>
            <?php _e('由 <a href="http://www.typecho.org" target="_blank">Typecho</a> 强力驱动'); ?>
        </div>
    </div>
    <div class="container">
        <header id="header">
            <div id="action-bar">
                <div class="header-left">
                    <button class="hamburger-button waver light radius">
                        <i class="material-icons hamburger-icon">menu</i>
                        <i class="material-icons arrow-icon">arrow_back</i>
                    </button>
                </div>

                <div class="header-right fold">
                    <form id="search" method="post" action="./" role="search">
                        <button id="search-btn" type="submit"  class="search-button waver light radius"><i class="material-icons">search</i></button>
                        <input id="search-input" type="text" name="s" class="text" placeholder="<?php _e('输入关键字搜索'); ?>" />
                        <button id="search-close-btn" class="search-close-button waver light radius"><i class="material-icons">close</i></button>
                    </form>
                </div>
            </div>
            <h1 class="title" id="title"><?php $this->options->title() ?></h1>
        </header>
