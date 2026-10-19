# Editing contact forms

Use the admin panel at `/admin` to change fields, dropdown choices, wording and field order. Publish the page or reusable section when the changes are ready. Routine form changes do not require a code edit.

## Choose the correct form

- **Contact page introduction:** open **Website → Pages → Contact**, then expand its **Contact form** section. This controls the form at the top of `/contact`.
- **Form reused across the website:** open **Website → Reusable sections → Contact**, then expand **Contact form**. Publishing this reusable section updates every page that references it.
- A form added directly to another page, service or project is edited in that record's own sections. Its field configuration belongs to that record.

The Contact page and shared Contact section are separate configurations. Editing one does not change the other.

## Add, remove, hide or reorder a field

1. Set **Form mode** to **Editable form builder**, if it is not already selected.
2. Expand **Form fields**. The rows appear on the website in this order.
3. Use the add button below the list, or a row's **Add Below** action, to create a field.
4. Enter its **Field key**, **Label** and **Type**. Set its options and validation rules as needed.
5. Drag a row by its handle to change its order. The row's three-dot menu also provides **Move Up** and **Move Down**, where applicable.
6. To remove a field, choose **Remove** from its row menu. To keep its configuration for later, turn off **Show field** instead.
7. Review the draft, then publish the parent page or reusable section.

The row menu also offers **Duplicate**. Give the duplicate a new, unique **Field key** before saving. Duplicate keys are rejected.

## Configure a field

| Setting | What it controls |
|---|---|
| **Field key** | The stable identity used to save the answer, such as `phone` or `projectDeadline`. Start with a lowercase letter and use letters, numbers or underscores. Keep this key unchanged when renaming a field. System names such as `website`, `source` and `form` are reserved; use `companyWebsite` for a website question. |
| **Label** | The visible question above the control. |
| **Type** | Text, email address, phone number, website address, number, long text, dropdown, date and time, or checkbox. |
| **Placeholder** | The hint shown before the visitor enters or selects a value. A checkbox uses its label instead. |
| **Help text** | Additional instructions beneath the field. |
| **Required** | Whether the visitor must answer. Required checkboxes must be checked. Any original field, including name, email or project details, can be made optional or removed. |
| **Show field** | Whether the field appears and participates in validation. Hidden fields do not accept submitted answers. |
| **Width** | **Half row** places the field in the next half of the two-column layout; **Full row** takes its own row. Fields stack on phones. |
| **Validation message** | An optional replacement for the default required/invalid message for this field. Write a message that covers the configured rules. |

Text fields support optional minimum and maximum character counts. Number fields support optional minimum and maximum values. Email, phone, website, dropdown and date/time fields also check that the supplied value is valid for their type. Server safety limits still apply.

Use at most 30 fields. Changing a field's key or type creates a different answer meaning; existing enquiries retain their original field snapshots.

## Edit dropdown choices

For a **Dropdown** field, choose its **Dropdown choices** source:

- **Custom options below:** add a label and saved value for each option. The label is visible to visitors; the value identifies the answer in the inbox. Keep saved values stable when changing labels. Reorder options by dragging their rows or using the row menu. Values must be unique within the dropdown.
- **Published services:** the choices follow the published Services records. Draft services are excluded. Edit and publish Services to update this list.

The placeholder is the empty choice. It clears an optional dropdown; a required dropdown must have an available option selected.

## Edit date and time controls

A **Date and time** field opens the branded calendar and time picker. Visitors choose a calendar day and enter a 24-hour time, then press **Apply**. **Cancel**, the close button and Escape leave the saved field value unchanged. **Clear** removes it; required-field validation still applies.

The answer represents the visitor's local date and time. The browser's time zone is saved with the answer and shown with the field. This records a scheduling preference; it does not check availability or create a confirmed booking.

The **Date picker labels** group controls the dialog title, navigation labels, keyboard help, time labels, Clear/Cancel/Apply wording and invalid-time message. The calendar supports keyboard navigation and dates from 1900 through 2200.

## Review and publish

Draft edits and autosave do not change the public form. Use the draft preview to review wording, order and controls; submission is disabled in draft preview. Publish the page or reusable section to accept enquiries using the new configuration.

The server validates each submission against the current published form. Visitors cannot supply their own required-field rules or dropdown choices. A visitor with an older page open may need to refresh after a form is changed.

The form also has editable **Submit label**, **Submitting label**, success/error messages, **Validation summary message**, **Preview message**, **Unavailable message** and privacy note. Invalid submissions show inline feedback and an error summary whose links focus the affected controls. Controls are disabled while sending, answers remain after a failed submission, and a successful submission clears the form.

## Read submitted answers

Open **Business → Enquiries**. Each new enquiry stores an ordered **Submitted answers** snapshot containing the field keys, labels, types and values from the published form that accepted it. Date/time answers include the supplied time zone. Later edits to labels, order or field definitions do not rewrite earlier answers.

The familiar name, email, company, service, budget, message and preferred-time summary fields are retained where those corresponding fields exist. If you remove them, review **Submitted answers** for the replacement fields. Enquiries remain private to authorized admin users.

## Older forms and empty configurations

**Original fields and labels** mode preserves the earlier form's field structure and copy. Use **Editable form builder** when you want to add, remove, hide, reorder or change required fields. An empty builder is deliberately empty; it does not restore the original fields.

If no enabled fields remain, the public form displays its **Unavailable message** and disables submission. Add or enable fields and publish to reopen it.

## Design reference

The closed field presentation follows the inspected Figma Contact and shared forms. Custom dropdown menus and the calendar use the site's typography, underline treatment, purple accent and spacing across their open, focus, selected, invalid and disabled states. Separate designer frames for every interaction state were not identified in the browser inspection; these states are brand-consistent implementations and can be refined if the designer supplies additional state references.

See [VERIFICATION.md](VERIFICATION.md) for the completed checks and [DESIGN-GAPS.md](DESIGN-GAPS.md) for outstanding source or content gaps.
