<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;

function themeConfig($form) {
    $logoUrl = new Typecho_Widget_Helper_Form_Element_Text('logoUrl', NULL, NULL, _t('站点LOGO地址'), _t('在这里填入一个图片URL地址, 以在网站标题前加上一个LOGO'));
    $form->addInput($logoUrl);
    
    $sidebarBlock = new Typecho_Widget_Helper_Form_Element_Checkbox('sidebarBlock', 
        array('ShowRecentPosts' => _t('显示最新文章'),
            'ShowRecentComments' => _t('显示最近回复'),
            'ShowCategory' => _t('显示分类'),
            'ShowArchive' => _t('显示归档'),
            'ShowLinks' => _t('显示友情链接'),
            'ShowOther' => _t('显示其它杂项')),
        array('ShowRecentPosts', 'ShowRecentComments', 'ShowCategory', 'ShowArchive', 'ShowLinks', 'ShowOther'), _t('侧边栏显示'));
    
    $form->addInput($sidebarBlock->multiMode());
}

/* 自定义上篇，下篇 */
function xmPrevNext($method,$t,$isLink)
    {
   $xdb = Typecho_Db::get();      
    switch($method){
      case "pre":
         $xrs = $xdb->fetchRow($xdb->select()->from('table.contents')   
            ->where('table.contents.created < ?', $t->created)
            ->where('table.contents.status = ?', 'publish')
            ->where('table.contents.type = ?', $t->type)
            ->where('table.contents.password IS NULL')
            ->order('table.contents.created', Typecho_Db::SORT_DESC)
            ->limit(1));
          if(sizeof($xrs)==0){
            switch($isLink){
               case 0:
                  echo "已是第一篇";
                  break;
               case 1:
                  echo "#";
                  break;
            }
          }
         break;
      case 'next':
         $xrs = $xdb->fetchRow($xdb->select()->from('table.contents')   
            ->where('table.contents.created > ?',$t->created)
            ->where('table.contents.status = ?', 'publish')
            ->where('table.contents.type = ?', $t->type)
            ->where('table.contents.password IS NULL')
            ->order('table.contents.created', Typecho_Db::SORT_ASC)
            ->limit(1));
            if(sizeof($xrs)==0){
            switch($isLink){
               case 0:
                  echo "已是最后一篇";
                  break;
               case 1:
                  echo "#";
                  break;
            }
          }
         break;
   }
      if($xrs){
      $xrs = $t->filter($xrs);
      if($isLink==0){
         echo $xrs['title'];
      }else{
         echo $xrs['permalink'];
         }
      }   
   }
/*
function themeFields($layout) {
    $logoUrl = new Typecho_Widget_Helper_Form_Element_Text('logoUrl', NULL, NULL, _t('站点LOGO地址'), _t('在这里填入一个图片URL地址, 以在网站标题前加上一个LOGO'));
    $layout->addItem($logoUrl);
}
*/
function is_ajax()
{
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        if ('xmlhttprequest' == strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])) {
            return true;
        }
    }
    return false;
}