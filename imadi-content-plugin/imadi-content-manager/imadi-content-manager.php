<?php
/**
 * Plugin Name: IMADI Content Manager
 * Description: Adds portfolio projects, testimonials, contact messages, and social proof content endpoints for the IMADI Innovations website.
 * Version: 1.2.0
 * Author: IMADI Innovations
 */

if (!defined('ABSPATH')) {
    exit;
}

class Imadi_Content_Manager
{
    const PROJECT_TYPE = 'imadi_project';
    const TESTIMONIAL_TYPE = 'imadi_testimonial';
    const CONTACT_TYPE = 'imadi_contact_msg';
    const OPTION_KEY = 'imadi_social_proof';

    public function __construct()
    {
        add_action('init', [$this, 'register_post_types']);
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post_' . self::PROJECT_TYPE, [$this, 'save_project']);
        add_action('save_post_' . self::TESTIMONIAL_TYPE, [$this, 'save_testimonial']);
        add_action('save_post_' . self::CONTACT_TYPE, [$this, 'save_contact_message']);
        add_filter('manage_' . self::TESTIMONIAL_TYPE . '_posts_columns', [$this, 'testimonial_columns']);
        add_action('manage_' . self::TESTIMONIAL_TYPE . '_posts_custom_column', [$this, 'render_testimonial_column'], 10, 2);
        add_filter('manage_' . self::CONTACT_TYPE . '_posts_columns', [$this, 'contact_message_columns']);
        add_action('manage_' . self::CONTACT_TYPE . '_posts_custom_column', [$this, 'render_contact_message_column'], 10, 2);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        add_action('admin_menu', [$this, 'register_settings_page']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    public function register_post_types()
    {
        register_post_type(self::PROJECT_TYPE, [
            'labels' => [
                'name' => 'Projects',
                'singular_name' => 'Project',
                'add_new_item' => 'Add New Project',
                'edit_item' => 'Edit Project',
            ],
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_icon' => 'dashicons-portfolio',
            'supports' => ['title', 'thumbnail', 'page-attributes'],
            'show_in_rest' => true,
            'rest_base' => 'imadi-projects',
            'has_archive' => false,
        ]);

        register_post_type(self::TESTIMONIAL_TYPE, [
            'labels' => [
                'name' => 'Testimonials',
                'singular_name' => 'Testimonial',
                'add_new_item' => 'Add New Testimonial',
                'edit_item' => 'Edit Testimonial',
            ],
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_icon' => 'dashicons-format-quote',
            'supports' => ['title', 'thumbnail', 'page-attributes'],
            'show_in_rest' => true,
            'rest_base' => 'imadi-testimonials',
            'has_archive' => false,
        ]);

        register_post_type(self::CONTACT_TYPE, [
            'labels' => [
                'name' => 'Contact Messages',
                'singular_name' => 'Contact Message',
                'add_new_item' => 'Add New Contact Message',
                'edit_item' => 'View Contact Message',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_icon' => 'dashicons-email-alt2',
            'supports' => ['title'],
            'show_in_rest' => true,
            'rest_base' => 'imadi-contact-messages',
            'has_archive' => false,
        ]);
    }

    public function register_meta_boxes()
    {
        add_meta_box(
            'imadi_project_details',
            'Project Details',
            [$this, 'render_project_meta_box'],
            self::PROJECT_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'imadi_testimonial_details',
            'Testimonial Details',
            [$this, 'render_testimonial_meta_box'],
            self::TESTIMONIAL_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'imadi_contact_message_details',
            'Contact Message Details',
            [$this, 'render_contact_message_meta_box'],
            self::CONTACT_TYPE,
            'normal',
            'high'
        );
    }

    public function enqueue_admin_assets($hook)
    {
        $screen = get_current_screen();
        if (!$screen || !in_array($screen->post_type, [self::PROJECT_TYPE, self::TESTIMONIAL_TYPE, self::CONTACT_TYPE], true)) {
            return;
        }

        wp_enqueue_media();
        wp_add_inline_style('wp-admin', $this->admin_css());
        wp_add_inline_script('jquery-core', $this->admin_js());
    }

    private function admin_css()
    {
        return '
            .imadi-field { margin: 0 0 18px; }
            .imadi-field label { display: block; font-weight: 600; margin-bottom: 6px; }
            .imadi-field input[type="text"],
            .imadi-field input[type="number"],
            .imadi-field textarea,
            .imadi-field select { width: 100%; max-width: 820px; }
            .imadi-field textarea { min-height: 110px; }
            .imadi-image-preview { display: block; max-width: 260px; height: auto; margin: 10px 0; border: 1px solid #dcdcde; background: #fff; }
            .imadi-feature-row { display: grid; grid-template-columns: minmax(160px, 260px) minmax(260px, 1fr) auto; gap: 8px; align-items: start; margin-bottom: 8px; max-width: 920px; }
            .imadi-help { color: #646970; font-size: 12px; margin-top: 5px; }
        ';
    }

    private function admin_js()
    {
        return "
            jQuery(function($) {
                $(document).on('click', '.imadi-upload-image', function(e) {
                    e.preventDefault();
                    const button = $(this);
                    const target = $('#' + button.data('target'));
                    const preview = $('#' + button.data('preview'));
                    const frame = wp.media({
                        title: 'Choose Image',
                        button: { text: 'Use this image' },
                        multiple: false
                    });
                    frame.on('select', function() {
                        const attachment = frame.state().get('selection').first().toJSON();
                        target.val(attachment.id);
                        preview.attr('src', attachment.url).show();
                    });
                    frame.open();
                });

                $(document).on('click', '.imadi-remove-image', function(e) {
                    e.preventDefault();
                    const button = $(this);
                    $('#' + button.data('target')).val('');
                    $('#' + button.data('preview')).attr('src', '').hide();
                });

                $(document).on('click', '.imadi-add-feature', function(e) {
                    e.preventDefault();
                    const list = $('.imadi-features-list');
                    const index = list.children('.imadi-feature-row').length;
                    list.append(
                        '<div class=\"imadi-feature-row\">' +
                            '<input type=\"text\" name=\"imadi_features[' + index + '][title]\" placeholder=\"Feature title\" />' +
                            '<input type=\"text\" name=\"imadi_features[' + index + '][desc]\" placeholder=\"Feature description\" />' +
                            '<button type=\"button\" class=\"button imadi-remove-feature\">Remove</button>' +
                        '</div>'
                    );
                });

                $(document).on('click', '.imadi-remove-feature', function(e) {
                    e.preventDefault();
                    $(this).closest('.imadi-feature-row').remove();
                });
            });
        ";
    }

    public function render_project_meta_box($post)
    {
        wp_nonce_field('imadi_project_save', 'imadi_project_nonce');

        $headline = get_post_meta($post->ID, 'headline', true);
        $description = get_post_meta($post->ID, 'description', true);
        $type = get_post_meta($post->ID, 'type', true) ?: 'Web';
        $features = get_post_meta($post->ID, 'features', true);
        $tech_stack = get_post_meta($post->ID, 'techStack', true);
        $desktop_id = absint(get_post_meta($post->ID, 'desktopImgId', true));
        $mobile_id = absint(get_post_meta($post->ID, 'mobileImgId', true));
        $hide_desktop = (bool) get_post_meta($post->ID, 'hideDesktop', true);

        if (!is_array($features)) {
            $features = [];
        }

        $this->text_field('Headline', 'imadi_headline', $headline, 'Short large heading shown inside the project slide.');
        $this->textarea_field('Description', 'imadi_description', $description);
        ?>
        <div class="imadi-field">
            <label for="imadi_type">Project Type</label>
            <select id="imadi_type" name="imadi_type">
                <?php foreach (['Web', 'Mobile', 'Web & Mobile'] as $choice) : ?>
                    <option value="<?php echo esc_attr($choice); ?>" <?php selected($type, $choice); ?>>
                        <?php echo esc_html($choice); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <?php
        $this->text_field('Tech Stack', 'imadi_tech_stack', $tech_stack, 'Example: Next.js, Flutter, Laravel, PostgreSQL');
        ?>
        <div class="imadi-field">
            <label>Features</label>
            <div class="imadi-features-list">
                <?php foreach ($features as $index => $feature) : ?>
                    <div class="imadi-feature-row">
                        <input type="text" name="imadi_features[<?php echo esc_attr($index); ?>][title]" value="<?php echo esc_attr($feature['title'] ?? ''); ?>" placeholder="Feature title" />
                        <input type="text" name="imadi_features[<?php echo esc_attr($index); ?>][desc]" value="<?php echo esc_attr($feature['desc'] ?? ''); ?>" placeholder="Feature description" />
                        <button type="button" class="button imadi-remove-feature">Remove</button>
                    </div>
                <?php endforeach; ?>
            </div>
            <button type="button" class="button imadi-add-feature">Add Feature</button>
        </div>
        <?php
        $this->image_field('Desktop Image', 'imadi_desktop_img_id', $desktop_id, 'desktop');
        $this->image_field('Mobile Image', 'imadi_mobile_img_id', $mobile_id, 'mobile');
        ?>
        <div class="imadi-field">
            <label>
                <input type="checkbox" name="imadi_hide_desktop" value="1" <?php checked($hide_desktop); ?> />
                Hide desktop frame and show mobile visual only
            </label>
        </div>
        <?php
    }

    public function render_testimonial_meta_box($post)
    {
        wp_nonce_field('imadi_testimonial_save', 'imadi_testimonial_nonce');

        $company = get_post_meta($post->ID, 'company', true);
        $role = get_post_meta($post->ID, 'role', true);
        $quote = get_post_meta($post->ID, 'quote', true);
        $rating = get_post_meta($post->ID, 'rating', true) ?: '5';
        $logo_id = absint(get_post_meta($post->ID, 'logoImgId', true));
        $email = get_post_meta($post->ID, 'email', true);
        $consent = (bool) get_post_meta($post->ID, 'consent', true);
        $submitted_at = get_post_meta($post->ID, 'submittedAt', true);

        $this->text_field('Submitter Email', 'imadi_email', $email);
        $this->text_field('Company', 'imadi_company', $company);
        $this->text_field('Role / Designation', 'imadi_role', $role);
        $this->textarea_field('Quote', 'imadi_quote', $quote);
        ?>
        <div class="imadi-field">
            <label for="imadi_rating">Rating</label>
            <input id="imadi_rating" name="imadi_rating" type="number" min="1" max="5" step="1" value="<?php echo esc_attr($rating); ?>" />
        </div>
        <?php
        $this->image_field('Client Image / Logo', 'imadi_logo_img_id', $logo_id, 'logo');
        ?>
        <div class="imadi-field">
            <label>
                <input type="checkbox" name="imadi_consent" value="1" <?php checked($consent); ?> />
                Client consented to publish this testimonial
            </label>
            <?php if ($submitted_at) : ?>
                <div class="imadi-help">Submitted at: <?php echo esc_html($submitted_at); ?></div>
            <?php endif; ?>
        </div>
        <?php
    }

    public function render_contact_message_meta_box($post)
    {
        wp_nonce_field('imadi_contact_message_save', 'imadi_contact_message_nonce');

        $full_name = get_post_meta($post->ID, 'fullName', true);
        $email = get_post_meta($post->ID, 'email', true);
        $company = get_post_meta($post->ID, 'company', true);
        $project_type = get_post_meta($post->ID, 'projectType', true);
        $budget = get_post_meta($post->ID, 'budget', true);
        $message = get_post_meta($post->ID, 'message', true);
        $submitted_at = get_post_meta($post->ID, 'submittedAt', true);

        $this->text_field('Full Name', 'imadi_contact_full_name', $full_name);
        $this->text_field('Email Address', 'imadi_contact_email', $email);
        $this->text_field('Company', 'imadi_contact_company', $company);
        $this->text_field('Project Type', 'imadi_contact_project_type', $project_type);
        $this->text_field('Budget Range', 'imadi_contact_budget', $budget);
        $this->textarea_field('Message', 'imadi_contact_message', $message);
        if ($submitted_at) : ?>
            <div class="imadi-field">
                <label>Submitted At</label>
                <div><?php echo esc_html($submitted_at); ?></div>
            </div>
        <?php endif;
    }

    private function text_field($label, $name, $value, $help = '')
    {
        ?>
        <div class="imadi-field">
            <label for="<?php echo esc_attr($name); ?>"><?php echo esc_html($label); ?></label>
            <input id="<?php echo esc_attr($name); ?>" name="<?php echo esc_attr($name); ?>" type="text" value="<?php echo esc_attr($value); ?>" />
            <?php if ($help) : ?><div class="imadi-help"><?php echo esc_html($help); ?></div><?php endif; ?>
        </div>
        <?php
    }

    private function textarea_field($label, $name, $value)
    {
        ?>
        <div class="imadi-field">
            <label for="<?php echo esc_attr($name); ?>"><?php echo esc_html($label); ?></label>
            <textarea id="<?php echo esc_attr($name); ?>" name="<?php echo esc_attr($name); ?>"><?php echo esc_textarea($value); ?></textarea>
        </div>
        <?php
    }

    private function image_field($label, $name, $attachment_id, $key)
    {
        $preview = $attachment_id ? wp_get_attachment_image_url($attachment_id, 'medium') : '';
        ?>
        <div class="imadi-field">
            <label><?php echo esc_html($label); ?></label>
            <input id="<?php echo esc_attr($name); ?>" name="<?php echo esc_attr($name); ?>" type="hidden" value="<?php echo esc_attr($attachment_id); ?>" />
            <img id="<?php echo esc_attr($name . '_preview'); ?>" class="imadi-image-preview" src="<?php echo esc_url($preview); ?>" style="<?php echo $preview ? '' : 'display:none;'; ?>" alt="" />
            <button type="button" class="button imadi-upload-image" data-target="<?php echo esc_attr($name); ?>" data-preview="<?php echo esc_attr($name . '_preview'); ?>">Choose Image</button>
            <button type="button" class="button imadi-remove-image" data-target="<?php echo esc_attr($name); ?>" data-preview="<?php echo esc_attr($name . '_preview'); ?>">Remove</button>
        </div>
        <?php
    }

    public function save_project($post_id)
    {
        if (!$this->can_save($post_id, 'imadi_project_nonce', 'imadi_project_save')) {
            return;
        }

        update_post_meta($post_id, 'headline', sanitize_text_field($_POST['imadi_headline'] ?? ''));
        update_post_meta($post_id, 'description', sanitize_textarea_field($_POST['imadi_description'] ?? ''));
        update_post_meta($post_id, 'type', $this->sanitize_project_type($_POST['imadi_type'] ?? 'Web'));
        update_post_meta($post_id, 'techStack', sanitize_text_field($_POST['imadi_tech_stack'] ?? ''));
        update_post_meta($post_id, 'desktopImgId', absint($_POST['imadi_desktop_img_id'] ?? 0));
        update_post_meta($post_id, 'mobileImgId', absint($_POST['imadi_mobile_img_id'] ?? 0));
        update_post_meta($post_id, 'hideDesktop', isset($_POST['imadi_hide_desktop']) ? '1' : '0');

        $features = [];
        if (isset($_POST['imadi_features']) && is_array($_POST['imadi_features'])) {
            foreach ($_POST['imadi_features'] as $feature) {
                $title = sanitize_text_field($feature['title'] ?? '');
                $desc = sanitize_text_field($feature['desc'] ?? '');
                if ($title !== '' || $desc !== '') {
                    $features[] = [
                        'title' => $title,
                        'desc' => $desc,
                    ];
                }
            }
        }
        update_post_meta($post_id, 'features', $features);
    }

    public function save_testimonial($post_id)
    {
        if (!$this->can_save($post_id, 'imadi_testimonial_nonce', 'imadi_testimonial_save')) {
            return;
        }

        update_post_meta($post_id, 'company', sanitize_text_field($_POST['imadi_company'] ?? ''));
        update_post_meta($post_id, 'role', sanitize_text_field($_POST['imadi_role'] ?? ''));
        update_post_meta($post_id, 'quote', sanitize_textarea_field($_POST['imadi_quote'] ?? ''));
        update_post_meta($post_id, 'rating', min(5, max(1, absint($_POST['imadi_rating'] ?? 5))));
        update_post_meta($post_id, 'logoImgId', absint($_POST['imadi_logo_img_id'] ?? 0));
        update_post_meta($post_id, 'email', sanitize_email($_POST['imadi_email'] ?? ''));
        update_post_meta($post_id, 'consent', isset($_POST['imadi_consent']) ? '1' : '0');
    }

    public function save_contact_message($post_id)
    {
        if (!$this->can_save($post_id, 'imadi_contact_message_nonce', 'imadi_contact_message_save')) {
            return;
        }

        update_post_meta($post_id, 'fullName', sanitize_text_field($_POST['imadi_contact_full_name'] ?? ''));
        update_post_meta($post_id, 'email', sanitize_email($_POST['imadi_contact_email'] ?? ''));
        update_post_meta($post_id, 'company', sanitize_text_field($_POST['imadi_contact_company'] ?? ''));
        update_post_meta($post_id, 'projectType', sanitize_text_field($_POST['imadi_contact_project_type'] ?? ''));
        update_post_meta($post_id, 'budget', sanitize_text_field($_POST['imadi_contact_budget'] ?? ''));
        update_post_meta($post_id, 'message', sanitize_textarea_field($_POST['imadi_contact_message'] ?? ''));
    }

    public function testimonial_columns($columns)
    {
        $columns['imadi_rating'] = 'Rating';
        $columns['imadi_company'] = 'Company';
        $columns['imadi_email'] = 'Email';
        $columns['imadi_consent'] = 'Consent';
        $columns['imadi_submitted_at'] = 'Submitted';

        return $columns;
    }

    public function render_testimonial_column($column, $post_id)
    {
        if ($column === 'imadi_rating') {
            echo esc_html(get_post_meta($post_id, 'rating', true) ?: '5');
            return;
        }

        if ($column === 'imadi_company') {
            echo esc_html(get_post_meta($post_id, 'company', true));
            return;
        }

        if ($column === 'imadi_email') {
            echo esc_html(get_post_meta($post_id, 'email', true));
            return;
        }

        if ($column === 'imadi_consent') {
            echo get_post_meta($post_id, 'consent', true) ? 'Yes' : 'No';
            return;
        }

        if ($column === 'imadi_submitted_at') {
            echo esc_html(get_post_meta($post_id, 'submittedAt', true));
        }
    }

    public function contact_message_columns($columns)
    {
        $columns['imadi_contact_email'] = 'Email';
        $columns['imadi_contact_company'] = 'Company';
        $columns['imadi_contact_project_type'] = 'Project Type';
        $columns['imadi_contact_budget'] = 'Budget';
        $columns['imadi_contact_submitted_at'] = 'Submitted';

        return $columns;
    }

    public function render_contact_message_column($column, $post_id)
    {
        if ($column === 'imadi_contact_email') {
            echo esc_html(get_post_meta($post_id, 'email', true));
            return;
        }

        if ($column === 'imadi_contact_company') {
            echo esc_html(get_post_meta($post_id, 'company', true));
            return;
        }

        if ($column === 'imadi_contact_project_type') {
            echo esc_html(get_post_meta($post_id, 'projectType', true));
            return;
        }

        if ($column === 'imadi_contact_budget') {
            echo esc_html(get_post_meta($post_id, 'budget', true));
            return;
        }

        if ($column === 'imadi_contact_submitted_at') {
            echo esc_html(get_post_meta($post_id, 'submittedAt', true));
        }
    }

    private function can_save($post_id, $nonce_name, $action)
    {
        if (!isset($_POST[$nonce_name]) || !wp_verify_nonce($_POST[$nonce_name], $action)) {
            return false;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return false;
        }

        return current_user_can('edit_post', $post_id);
    }

    private function sanitize_project_type($type)
    {
        return in_array($type, ['Web', 'Mobile', 'Web & Mobile'], true) ? $type : 'Web';
    }

    public function register_settings_page()
    {
        add_menu_page(
            'IMADI Site Content',
            'IMADI Content',
            'manage_options',
            'imadi-content',
            [$this, 'render_settings_page'],
            'dashicons-admin-site-alt3',
            25
        );
    }

    public function register_settings()
    {
        register_setting('imadi_content_settings', self::OPTION_KEY, [
            'type' => 'array',
            'sanitize_callback' => [$this, 'sanitize_social_proof_settings'],
            'default' => $this->default_social_proof(),
        ]);
    }

    public function sanitize_social_proof_settings($input)
    {
        $stats = [];
        if (!empty($input['stats']) && is_array($input['stats'])) {
            foreach ($input['stats'] as $stat) {
                $stats[] = [
                    'value' => sanitize_text_field($stat['value'] ?? ''),
                    'label' => sanitize_text_field($stat['label'] ?? ''),
                ];
            }
        }

        $industries = array_filter(array_map('trim', explode("\n", sanitize_textarea_field($input['industries'] ?? ''))));

        return [
            'heading' => sanitize_text_field($input['heading'] ?? 'Trusted By Businesses Across Industries'),
            'eyebrow' => sanitize_text_field($input['eyebrow'] ?? 'Our Impact'),
            'stats' => array_slice($stats, 0, 3),
            'industries' => array_values($industries),
        ];
    }

    public function render_settings_page()
    {
        $settings = wp_parse_args(get_option(self::OPTION_KEY, []), $this->default_social_proof());
        ?>
        <div class="wrap">
            <h1>IMADI Site Content</h1>
            <p>Manage the social proof section shown near the portfolio.</p>
            <form method="post" action="options.php">
                <?php settings_fields('imadi_content_settings'); ?>
                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="imadi_eyebrow">Eyebrow</label></th>
                        <td><input id="imadi_eyebrow" class="regular-text" name="<?php echo esc_attr(self::OPTION_KEY); ?>[eyebrow]" value="<?php echo esc_attr($settings['eyebrow']); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="imadi_heading">Heading</label></th>
                        <td><input id="imadi_heading" class="regular-text" name="<?php echo esc_attr(self::OPTION_KEY); ?>[heading]" value="<?php echo esc_attr($settings['heading']); ?>" /></td>
                    </tr>
                    <?php for ($i = 0; $i < 3; $i++) : $stat = $settings['stats'][$i] ?? ['value' => '', 'label' => '']; ?>
                        <tr>
                            <th scope="row">Stat <?php echo esc_html($i + 1); ?></th>
                            <td>
                                <input class="small-text" name="<?php echo esc_attr(self::OPTION_KEY); ?>[stats][<?php echo esc_attr($i); ?>][value]" value="<?php echo esc_attr($stat['value']); ?>" placeholder="10+" />
                                <input class="regular-text" name="<?php echo esc_attr(self::OPTION_KEY); ?>[stats][<?php echo esc_attr($i); ?>][label]" value="<?php echo esc_attr($stat['label']); ?>" placeholder="Completed Systems" />
                            </td>
                        </tr>
                    <?php endfor; ?>
                    <tr>
                        <th scope="row"><label for="imadi_industries">Industries</label></th>
                        <td>
                            <textarea id="imadi_industries" class="large-text" rows="7" name="<?php echo esc_attr(self::OPTION_KEY); ?>[industries]"><?php echo esc_textarea(implode("\n", $settings['industries'])); ?></textarea>
                            <p class="description">One industry per line.</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    private function default_social_proof()
    {
        return [
            'eyebrow' => 'Our Impact',
            'heading' => 'Trusted By Businesses Across Industries',
            'stats' => [
                ['value' => '10+', 'label' => 'Completed Systems'],
                ['value' => '6+', 'label' => 'Countries Served'],
                ['value' => '90%', 'label' => 'Client Return Rate'],
            ],
            'industries' => ['Logistics', 'Education', 'Wellness', 'Hospitality', 'Community Platforms', 'Retail'],
        ];
    }

    public function register_rest_routes()
    {
        register_rest_route('imadi/v1', '/projects', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_projects'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('imadi/v1', '/testimonials', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_testimonials'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('imadi/v1', '/social-proof', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_social_proof'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('imadi/v1', '/testimonial-submissions', [
            'methods' => 'POST',
            'callback' => [$this, 'rest_create_testimonial_submission'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('imadi/v1', '/contact-submissions', [
            'methods' => 'POST',
            'callback' => [$this, 'rest_create_contact_submission'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_projects()
    {
        $query = new WP_Query([
            'post_type' => self::PROJECT_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => 100,
            'orderby' => ['menu_order' => 'ASC', 'date' => 'DESC'],
        ]);

        $projects = array_map(function ($post) {
            return [
                'id' => $post->ID,
                'title' => get_the_title($post),
                'headline' => get_post_meta($post->ID, 'headline', true),
                'description' => get_post_meta($post->ID, 'description', true),
                'type' => get_post_meta($post->ID, 'type', true) ?: 'Web',
                'features' => get_post_meta($post->ID, 'features', true) ?: [],
                'techStack' => get_post_meta($post->ID, 'techStack', true),
                'desktopImg' => $this->image_url(get_post_meta($post->ID, 'desktopImgId', true)),
                'mobileImg' => $this->image_url(get_post_meta($post->ID, 'mobileImgId', true)),
                'hideDesktop' => (bool) get_post_meta($post->ID, 'hideDesktop', true),
            ];
        }, $query->posts);

        return rest_ensure_response($projects);
    }

    public function rest_testimonials()
    {
        $query = new WP_Query([
            'post_type' => self::TESTIMONIAL_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => 100,
            'orderby' => ['menu_order' => 'ASC', 'date' => 'DESC'],
        ]);

        $testimonials = array_map(function ($post) {
            return [
                'id' => $post->ID,
                'name' => get_the_title($post),
                'company' => get_post_meta($post->ID, 'company', true),
                'role' => get_post_meta($post->ID, 'role', true),
                'quote' => get_post_meta($post->ID, 'quote', true),
                'rating' => absint(get_post_meta($post->ID, 'rating', true) ?: 5),
                'image' => $this->image_url(get_post_meta($post->ID, 'logoImgId', true)),
            ];
        }, $query->posts);

        return rest_ensure_response($testimonials);
    }

    public function rest_social_proof()
    {
        return rest_ensure_response(wp_parse_args(get_option(self::OPTION_KEY, []), $this->default_social_proof()));
    }

    public function rest_create_testimonial_submission(WP_REST_Request $request)
    {
        $honeypot = sanitize_text_field($request->get_param('website') ?? '');
        if ($honeypot !== '') {
            return rest_ensure_response([
                'success' => true,
                'message' => 'Thank you for your testimonial.',
            ]);
        }

        $ip = $this->request_ip();
        $rate_key = 'imadi_testimonial_submission_' . md5($ip);
        if (get_transient($rate_key)) {
            return new WP_Error(
                'imadi_rate_limited',
                'Please wait a few minutes before submitting another testimonial.',
                ['status' => 429]
            );
        }

        $name = sanitize_text_field($request->get_param('name') ?? '');
        $email = sanitize_email($request->get_param('email') ?? '');
        $company = sanitize_text_field($request->get_param('company') ?? '');
        $role = sanitize_text_field($request->get_param('role') ?? '');
        $quote = sanitize_textarea_field($request->get_param('quote') ?? '');
        $rating = min(5, max(1, absint($request->get_param('rating') ?? 5)));
        $consent = filter_var($request->get_param('consent'), FILTER_VALIDATE_BOOLEAN);

        if ($name === '' || $email === '' || $quote === '') {
            return new WP_Error(
                'imadi_missing_fields',
                'Name, email, and testimonial are required.',
                ['status' => 400]
            );
        }

        if (!is_email($email)) {
            return new WP_Error(
                'imadi_invalid_email',
                'Please provide a valid email address.',
                ['status' => 400]
            );
        }

        if (!$consent) {
            return new WP_Error(
                'imadi_missing_consent',
                'Consent is required before submitting a testimonial.',
                ['status' => 400]
            );
        }

        if (strlen($quote) < 20 || strlen($quote) > 1200) {
            return new WP_Error(
                'imadi_invalid_quote_length',
                'Testimonials must be between 20 and 1200 characters.',
                ['status' => 400]
            );
        }

        $post_id = wp_insert_post([
            'post_type' => self::TESTIMONIAL_TYPE,
            'post_status' => 'pending',
            'post_title' => $name,
            'meta_input' => [
                'email' => $email,
                'company' => $company,
                'role' => $role,
                'quote' => $quote,
                'rating' => $rating,
                'consent' => '1',
                'submittedAt' => current_time('mysql'),
                'submissionIpHash' => md5($ip),
            ],
        ], true);

        if (is_wp_error($post_id)) {
            return new WP_Error(
                'imadi_submission_failed',
                'We could not save your testimonial right now.',
                ['status' => 500]
            );
        }

        set_transient($rate_key, '1', 10 * MINUTE_IN_SECONDS);

        return rest_ensure_response([
            'success' => true,
            'message' => 'Thank you. Your testimonial has been submitted for review.',
            'id' => $post_id,
        ]);
    }

    public function rest_create_contact_submission(WP_REST_Request $request)
    {
        $honeypot = sanitize_text_field($request->get_param('website') ?? '');
        if ($honeypot !== '') {
            return rest_ensure_response([
                'success' => true,
                'message' => 'Thank you. Your message has been sent.',
            ]);
        }

        $ip = $this->request_ip();
        $rate_key = 'imadi_contact_submission_' . md5($ip);
        if (get_transient($rate_key)) {
            return new WP_Error(
                'imadi_contact_rate_limited',
                'Please wait a few minutes before sending another message.',
                ['status' => 429]
            );
        }

        $full_name = sanitize_text_field($request->get_param('fullName') ?? '');
        $email = sanitize_email($request->get_param('email') ?? '');
        $company = sanitize_text_field($request->get_param('company') ?? '');
        $project_type = sanitize_text_field($request->get_param('projectType') ?? '');
        $budget = sanitize_text_field($request->get_param('budget') ?? '');
        $message = sanitize_textarea_field($request->get_param('message') ?? '');

        if ($full_name === '' || $email === '' || $message === '') {
            return new WP_Error(
                'imadi_contact_missing_fields',
                'Full name, email, and message are required.',
                ['status' => 400]
            );
        }

        if (!is_email($email)) {
            return new WP_Error(
                'imadi_contact_invalid_email',
                'Please provide a valid email address.',
                ['status' => 400]
            );
        }

        if (strlen($message) < 10 || strlen($message) > 2000) {
            return new WP_Error(
                'imadi_contact_invalid_message_length',
                'Messages must be between 10 and 2000 characters.',
                ['status' => 400]
            );
        }

        $post_id = wp_insert_post([
            'post_type' => self::CONTACT_TYPE,
            'post_status' => 'private',
            'post_title' => sprintf('Project inquiry from %s', $full_name),
            'meta_input' => [
                'fullName' => $full_name,
                'email' => $email,
                'company' => $company,
                'projectType' => $project_type,
                'budget' => $budget,
                'message' => $message,
                'submittedAt' => current_time('mysql'),
                'submissionIpHash' => md5($ip),
            ],
        ], true);

        if (is_wp_error($post_id)) {
            return new WP_Error(
                'imadi_contact_submission_failed',
                'We could not save your message right now.',
                ['status' => 500]
            );
        }

        set_transient($rate_key, '1', 10 * MINUTE_IN_SECONDS);

        return rest_ensure_response([
            'success' => true,
            'message' => 'Thank you. Your message has been sent.',
            'id' => $post_id,
        ]);
    }

    private function request_ip()
    {
        $forwarded_for = sanitize_text_field($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');
        if ($forwarded_for !== '') {
            $ips = explode(',', $forwarded_for);
            return trim($ips[0]);
        }

        return sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    }

    private function image_url($attachment_id)
    {
        $attachment_id = absint($attachment_id);
        return $attachment_id ? wp_get_attachment_url($attachment_id) : null;
    }
}

new Imadi_Content_Manager();
