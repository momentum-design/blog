# Momentum Blog

Blog is a document which contain documents for Momentum libraries. It supports localization and help to generate static website from markdown files.

You can visit [the website](https://momentum-design.github.io/blog/) here.

## Table of Contents
- [Workflow](#Workflow)
- [Documents](#Documents)
- [Contribute](#Contribute)
- [License](#license)

## Workflow

Momentum repostories such as [mframe](https://github.com/momentum-design/mframe) follow the following steps to update its web pages under blog website.

1) Perpare [github action copy](https://github.com/momentum-design/mframe/blob/master/.github/workflows/copy.yml) to copy doucment from other repostories to ```doc/_posts``` under blog repostory. Copy files to ```/doc/_posts/en_us/$projectName$``` at last.

2) Update documents in [mframe](https://github.com/momentum-design/mframe)

3) The [github action deploy](https://github.com/momentum-design/blog/blob/master/.github/workflows/deploy.yml) in blog site will use [hexo](https://hexo.io/) to generate and deploy the website.


## Documents

### catrgories

Momentum blog will set up each document's catrgories according to it's path.

##### path 

```_posts/en_us/mframe/fundamentals/event.md```

##### catrgories

```
en_us
	mframe
		fundamentals
```

### yml header

You can find the format according to [Hexo front format](https://hexo.io/docs/front-matter).

In order to hide the yml header in github website, you can use the remark code `<!-- -->` to warp the yml header.

```
<!-- 
---
date: 2020/3/1 10:00:00
---
-->
```

### remark

Because github website does not support some tags such as iframe. You can warp the code with ```<!--@ @-->``` to hide iframe in github website and show it in blog website.

#### example

```
<!--@<iframe src="https://momentum.design"></iframe>@-->
```

```
<!--@Hidden String@-->
```

### localization

Check the language supports [here](https://github.com/momentum-design/blog/tree/master/themes/momentum/languages)

You should copy documents in different languages to its language folder under ```doc/_posts```.

+ ```doc/_posts/en_us/your_project_name``` English Documents 

+ ```doc/_posts/zh_cn/your_project_name```  中文文档   

## Contribute

You can clone Momentum Motion from [github](https://github.com/momentum-design/blog).

1) Install packages ```sudo yarn```

2) In ```_config.yml```, change ```url: https://momentum-design.github.io/blog``` to ```url: http://localhost:4000/blog```

3) Update code in ```themes/momentum```

4) run website ```sudo hexo clean && hexo g && hexo s```


## License

[© 2019-2020 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
