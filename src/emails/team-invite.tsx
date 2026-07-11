import { EmailLayout, heading, paragraph, buttonSection, button, fallbackText, fallbackLink } from "./EmailLayout";
import { Text } from "@react-email/components";

interface TeamInviteEmailProps {
  inviterName: string;
  workspaceName: string;
  inviteLink: string;
}

export function TeamInviteEmail({ inviterName, workspaceName, inviteLink }: TeamInviteEmailProps) {
  return (
    <EmailLayout preview={`${inviterName} invited you to join ${workspaceName} on Prontly Notify`}>
      <Text style={heading}>You&apos;re invited!</Text>
      <Text style={paragraph}>
        <strong>{inviterName}</strong> has invited you to join <strong>{workspaceName}</strong> on Prontly Notify.
      </Text>
      <Text style={paragraph}>
        Prontly Notify helps you send targeted push notifications to your audience — no app required.
      </Text>
      <table style={buttonSection} align="center">
        <tr>
          <td align="center">
            <a href={inviteLink} target="_blank" style={button}>
              Accept Invitation
            </a>
          </td>
        </tr>
      </table>
      <Text style={fallbackText}>If the button doesn&apos;t work, copy and paste this link into your browser:</Text>
      <Text style={fallbackLink}>{inviteLink}</Text>
    </EmailLayout>
  );
}
