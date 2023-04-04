[1mdiff --git a/frontend/src/addons/volto-conf2023-theme/src/components/Blocks/Teaser/Teaser2ColumnsFeatured.jsx b/frontend/src/addons/volto-conf2023-theme/src/components/Blocks/Teaser/Teaser2ColumnsFeatured.jsx[m
[1mindex da2a5e9..c1f1c3a 100644[m
[1m--- a/frontend/src/addons/volto-conf2023-theme/src/components/Blocks/Teaser/Teaser2ColumnsFeatured.jsx[m
[1m+++ b/frontend/src/addons/volto-conf2023-theme/src/components/Blocks/Teaser/Teaser2ColumnsFeatured.jsx[m
[36m@@ -16,9 +16,8 @@[m [mimport {[m
   normalizeExternalData,[m
 } from '@plone/volto-slate/utils';[m
 import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';[m
[31m-import { getTeaserImageURL } from '@plone/volto/components/manage/Blocks/Teaser/utils';[m
 import { flattenToAppURL } from '@plone/volto/helpers';[m
[31m-import config from '@plone/volto/registry';[m
[32m+[m[32mimport Picture from 'volto-conf2023-theme/components/Picture/Picture';[m
 [m
 import StringToHTML from '../../helpers/StringToHTML';[m
 import cx from 'classnames';[m
[36m@@ -31,18 +30,19 @@[m [mconst messages = defineMessages({[m
       'Please choose an existing content as source for this element',[m
   },[m
 });[m
[31m-const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;[m
 [m
 const ImageContainer = (props) => {[m
[31m-  const { hasImageComponent, href, defaultImageSrc } = props;[m
[31m-  const Image = config.getComponent('Image').component || DefaultImage;[m
[32m+[m[32m  const { image, alt } = props;[m
   return ([m
[31m-    <Image[m
[32m+[m[32m    <Picture[m
[32m+[m[32m      source="teaser2columns"[m
       className="home-featured-image"[m
[31m-      src={hasImageComponent ? href : defaultImageSrc}[m
[31m-      alt=""[m
[31m-      loading="lazy"[m
[31m-    />[m
[32m+[m[32m      content={image}[m
[32m+[m[32m      imageBase={flattenToAppURL([m
[32m+[m[32m        `${image['@id']}/@@images/${image.image_field}`,[m
[32m+[m[32m      )}[m
[32m+[m[32m      alt={alt}[m
[32m+[m[32m    ></Picture>[m
   );[m
 };[m
 [m
[36m@@ -59,11 +59,6 @@[m [mconst Teaser2ColumnsFeatured = (props) => {[m
   const intl = useIntl();[m
   const href = data.href?.[0];[m
   const image = data.preview_image?.[0];[m
[31m-  const align = data?.styles?.align;[m
[31m-[m
[31m-  const hasImageComponent = config.getComponent('Image').component;[m
[31m-  const defaultImageSrc =[m
[31m-    href && flattenToAppURL(getTeaserImageURL({ href, image, align }));[m
 [m
   const editor = React.useMemo(() => makeEditor(), []);[m
   const token = useSelector((state) => state.userSession.token);[m
[36m@@ -134,11 +129,7 @@[m [mconst Teaser2ColumnsFeatured = (props) => {[m
           <Grid className="home-teaser-item-content" columns={2} stackable>[m
             {(href.hasPreviewImage || image) && data.imageSide === 'left' && ([m
               <Grid.Column className="grid-image-wrapper-column">[m
[31m-                <ImageContainer[m
[31m-                  hasImageComponent={hasImageComponent}[m
[31m-                  href={href}[m
[31m-                  defaultImageSrc={defaultImageSrc}[m
[31m-                />[m
[32m+[m[32m                <ImageContainer image={image} alt={data?.title} />[m
               </Grid.Column>[m
             )}[m
             <Grid.Column[m
[36m@@ -172,11 +163,7 @@[m [mconst Teaser2ColumnsFeatured = (props) => {[m
             </Grid.Column>[m
             {(href.hasPreviewImage || image) && data.imageSide === 'right' && ([m
               <Grid.Column className="grid-image-wrapper-column">[m
[31m-                <ImageContainer[m
[31m-                  hasImageComponent={hasImageComponent}[m
[31m-                  href={href}[m
[31m-                  defaultImageSrc={defaultImageSrc}[m
[31m-                />[m
[32m+[m[32m                <ImageContainer image={image} alt={data?.title} />[m
               </Grid.Column>[m
             )}[m
           </Grid>[m
