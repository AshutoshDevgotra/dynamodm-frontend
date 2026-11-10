import { redirect } from 'next/navigation';

export default function LegacySubscriptionsRoute() {
  redirect('/creator/subscription');
}
