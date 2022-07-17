<?php
$newsletter = get_fields();
?>

<div class="swing-newsletter">
    <div class="inner-wrap">
        <h2>
            <?php echo $newsletter['title'] ?>
        </h2>
        <div>
            <div class="btn">
                <a href="<?php echo $newsletter['button']['url'] ?>" target="<?php echo $newsletter['button']['target'] ?>">
                    <?php echo $newsletter['button']['title'] ?>
                </a>
            </div>
        </div>
    </div>
</div>