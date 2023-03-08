import FormControlComponent from '../FormControlComponent';

class Textarea extends FormControlComponent {
  override renderTemplate() {
    return `
      <style>
        textarea {
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%;
          resize: none;
        }
      </style>

      <textarea rows="${this.getAttribute('rows') ?? 4}"></textarea>
    `;
  }

  override render() {
    super.render();

    this.shadowRoot
      ?.querySelector<HTMLTextAreaElement>('textarea')
      ?.addEventListener('input', (event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          this.internals.setFormValue(event.target.value.trim());
        }
      });
  }

  override validate() {
    if (this.hasAttribute('required') && !this.value) {
      this.internals.setValidity(
        { valueMissing: true },
        '값을 입력해야 합니다.',
        this.shadowRoot?.querySelector('textarea') ?? undefined,
      );
      return;
    }
    this.internals.setValidity({});
  }

  override get value() {
    return document.querySelector<HTMLTextAreaElement>('textarea')?.innerText ?? '';
  }
}

customElements.define('r-textarea', Textarea);

export default Textarea;
