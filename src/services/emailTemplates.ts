export const emailStyles = {
  container: `
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #f1f5f9;
  `,
  header: `
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 32px;
    text-align: center;
  `,
  logo: `
    color: #ffffff;
    font-size: 24px;
    font-weight: 800;
    text-decoration: none;
    letter-spacing: -0.5px;
  `,
  content: `
    padding: 32px;
    color: #334155;
    line-height: 1.6;
  `,
  greeting: `
    font-size: 20px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 24px;
  `,
  text: `
    font-size: 16px;
    color: #475569;
    margin-bottom: 24px;
  `,
  buttonContainer: `
    text-align: center;
    margin: 32px 0;
  `,
  button: `
    display: inline-block;
    background: #0f172a;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    padding: 16px 32px;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s;
    box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06);
  `,
  divider: `
    height: 1px;
    background-color: #e2e8f0;
    margin: 32px 0;
  `,
  footer: `
    background-color: #f8fafc;
    padding: 24px;
    text-align: center;
    font-size: 14px;
    color: #94a3b8;
  `,
  highlight: `
    color: #4f46e5;
    font-weight: 600;
  `
};

export const getWelcomeEmailTemplate = (name: string) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <div style="${emailStyles.logo}">TopEdge Community</div>
    </div>
    <div style="${emailStyles.content}">
      <h1 style="${emailStyles.greeting}">Welcome to the Future, ${name}! 🚀</h1>
      <p style="${emailStyles.text}">
        We're thrilled to have you join TopEdge Community. You've just taken the first step towards connecting with top innovators and accessing premium automation resources.
      </p>
      <p style="${emailStyles.text}">
        To get the most out of your membership, please complete your profile. It helps others discover you and unlocks full access to community features.
      </p>
      <div style="${emailStyles.buttonContainer}">
        <a href="https://topedge-community.netlify.app/community/profile/edit" style="${emailStyles.button}">
          Complete Your Profile
        </a>
      </div>
      <div style="${emailStyles.divider}"></div>
      <p style="${emailStyles.text}">
        <strong>What's next?</strong><br>
        1. Complete your profile<br>
        2. Browse automation resources<br>
        3. Connect with other builders
      </p>
    </div>
    <div style="${emailStyles.footer}">
      © ${new Date().getFullYear()} TopEdge Community. All rights reserved.<br>
      Building the future of automation, together.
    </div>
  </div>
`;

export const getProfileReminderTemplate = (name: string, daysAgo: number) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <div style="${emailStyles.logo}">TopEdge Community</div>
    </div>
    <div style="${emailStyles.content}">
      <h1 style="${emailStyles.greeting}">Don't Stay Anonymous, ${name}! 👀</h1>
      <p style="${emailStyles.text}">
        We noticed you joined ${daysAgo} days ago but haven't completed your profile yet. An incomplete profile is like a ghost town—nobody visits!
      </p>
      <p style="${emailStyles.text}">
        <span style="${emailStyles.highlight}">Why complete it?</span><br>
        ✨ Get discovered by potential clients<br>
        ✨ Unlock exclusive community resources<br>
        ✨ Earn trust badges on your profile
      </p>
      <div style="${emailStyles.buttonContainer}">
        <a href="https://topedge-community.netlify.app/community/profile/edit" style="${emailStyles.button}">
          Complete Profile Now
        </a>
      </div>
    </div>
    <div style="${emailStyles.footer}">
      © ${new Date().getFullYear()} TopEdge Community. All rights reserved.
    </div>
  </div>
`;

export const getResourceUploadNudgeTemplate = (name: string) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <div style="${emailStyles.logo}">TopEdge Community</div>
    </div>
    <div style="${emailStyles.content}">
      <h1 style="${emailStyles.greeting}">Turn Your Knowledge into Income 💰</h1>
      <p style="${emailStyles.text}">
        Hey ${name}, your profile looks great! Now it's time to showcase your expertise.
      </p>
      <p style="${emailStyles.text}">
        Did you know you can upload your automation scripts, templates, and workflows to our marketplace? You can offer them for free to build reputation or sell them to earn revenue.
      </p>
      <div style="${emailStyles.buttonContainer}">
        <a href="https://topedge-community.netlify.app/community/upload" style="${emailStyles.button}">
          Upload Your First Resource
        </a>
      </div>
      <p style="${emailStyles.text}">
        <strong>Top creators are earning by sharing:</strong><br>
        • Chatbot Templates<br>
        • Automation Workflows<br>
        • AI Agent Configs
      </p>
    </div>
    <div style="${emailStyles.footer}">
      © ${new Date().getFullYear()} TopEdge Community. All rights reserved.
    </div>
  </div>
`;

export const getCommunityUpdateTemplate = (title: string, content: string, ctaText: string, ctaLink: string) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <div style="${emailStyles.logo}">TopEdge Community Update</div>
    </div>
    <div style="${emailStyles.content}">
      <h1 style="${emailStyles.greeting}">${title}</h1>
      <p style="${emailStyles.text}">
        ${content}
      </p>
      <div style="${emailStyles.buttonContainer}">
        <a href="${ctaLink}" style="${emailStyles.button}">
          ${ctaText}
        </a>
      </div>
    </div>
    <div style="${emailStyles.footer}">
      © ${new Date().getFullYear()} TopEdge Community. All rights reserved.
    </div>
  </div>
`;
