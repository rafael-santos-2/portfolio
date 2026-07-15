import { JSX } from "react";
import { IIcon, IIconAsset, TIconName } from './icons.types';

import Icon2D from './assets/2D';
import Icon3D from './assets/3D';
import IconAccount from './assets/account';
import IconAdd from './assets/add';
import { IconAlertCircle } from './assets/alert-circle';
import IconArrow from './assets/arrow';
import IconArrowCompare from './assets/arrow-compare';
import IconArrowsOrder from './assets/arrows-order';
import IconAuction from './assets/auction';
import IconAutoSelect from './assets/auto-select';
import IconAward from './assets/award';
import { IconBan } from './assets/ban';
import IconBank from './assets/bank';
import { IconBell } from './assets/bell';
import IconBid from './assets/bid';
import IconBids from './assets/bids';
import IconBlock from './assets/block';
import IconCalculate from './assets/calculate';
import { IconCalendar } from './assets/calendar';
import { IconCamera } from './assets/camera';
import IconCameraAgain from './assets/camera-again';
import IconCameraOff from './assets/camera-off';
import IconCarrousel from './assets/carrousel';
import IconCash from './assets/cash';
import { IconChangelog } from './assets/changelog';
import IconCheck from './assets/check';
import IconCheckAnimated from './assets/check-animated';
import { IconCheckCircle } from './assets/check-circle';
import IconCheckDouble from './assets/check-double';
import { IconChevron } from './assets/chevron';
import { IconChevronDouble } from './assets/chevron-double';
import IconCilinder from './assets/cilinder';
import IconClients from './assets/clients';
import { IconClose } from './assets/close';
import { IconColumns } from './assets/columns';
import IconContact from './assets/contact';
import { IconCopy } from './assets/copy';
import IconCreditCard from './assets/credit-card';
import { IconCsv } from './assets/csv';
import { IconDashboard } from './assets/dashboard';
import IconDelivery from './assets/delivery';
import IconDeliveryTruck from './assets/delivery-truck';
import IconDiameter from './assets/diameter';
import { IconDocument } from './assets/document';
import IconDocuments from './assets/documents';
import IconDollarOut from './assets/dollar-out';
import IconDots from './assets/dots';
import { IconDotsMore } from './assets/dots-more';
import { IconDownload } from './assets/download';
import IconDrag from './assets/drag';
import IconEdit from './assets/edit';
import IconEmail from './assets/email';
import IconError from './assets/error';
import IconEuro from './assets/euro';
import IconExpand from './assets/expand';
import IconExport from './assets/export';
import { IconEye } from './assets/eye';
import IconFacebook from './assets/facebook';
import { IconFile } from './assets/file';
import IconFilters from './assets/filters';
import IconFirstItem from './assets/first-item';
import IconFlag from './assets/flag';
import IconFlagCountry from './assets/flag-country';
import { IconFolder } from './assets/folder';
import IconGenerate from './assets/generate';
import IconGraph from './assets/graph';
import IconHandshake from './assets/handshake';
import IconHeart from './assets/heart';
import IconHeight from './assets/height';
import IconHome from './assets/home';
import { IconImage } from './assets/image';
import { IconImport } from './assets/import';
import IconInfo from './assets/info';
import { IconInfoCircle } from './assets/info-circle';
import IconInsert from './assets/insert';
import IconInstagram from './assets/instagram';
import IconInvoice from './assets/invoice';
import IconLastItem from './assets/last-item';
import IconLayers from './assets/layers';
import IconLinkAdd from './assets/link-add';
import IconList from './assets/list';
import { IconLock } from './assets/lock';
import { IconLogin } from './assets/login';
import { IconLogout } from './assets/logout';
import IconLogs from './assets/logs';
import IconMail from './assets/mail';
import IconMailBlock from './assets/mail-block';
import IconMailFailed from './assets/mail-failed';
import IconMailSending from './assets/mail-sending';
import IconMailSuccess from './assets/mail-success';
import IconMenu from './assets/menu';
import IconMinus from './assets/minus';
import IconMoneySlash from './assets/money-slash';
import IconMoon from './assets/moon';
import { IconMp3 } from './assets/mp3';
import { IconMp4 } from './assets/mp4';
import IconNetwork from './assets/network';
import IconNoResults from './assets/no-results';
import IconOpen from './assets/open';
import IconOverview from './assets/overview';
import IconPackage from './assets/package';
import IconPaymentMethod from './assets/payment-method';
import { IconPdf } from './assets/pdf';
import { IconPencil } from './assets/pencil';
import IconPending from './assets/pending';
import IconPercentage from './assets/percentage';
import IconPerson from './assets/person';
import IconPhone from './assets/phone';
import IconPhotos from './assets/photos';
import IconPiggyBank from './assets/piggy-bank';
import IconPlay from './assets/play';
import IconPlugin from './assets/plugin';
import { IconPlus } from './assets/plus';
import { IconPpt } from './assets/ppt';
import IconProcessing from './assets/processing';
import { IconProfile } from './assets/profile';
import IconQR from './assets/qr';
import IconReceiveMoney from './assets/receive-money';
import IconRemove from './assets/remove';
import IconRemoveFromList from './assets/remove-list';
import IconRequests from './assets/requests';
import IconReset from './assets/reset';
import IconRetry from './assets/retry';
import IconReturn from './assets/return';
import IconReview from './assets/review';
import IconRunning from './assets/running';
import { IconSearch } from './assets/search';
import { IconSearchRemove } from './assets/search-remove';
import IconSelect from './assets/select';
import IconSell from './assets/sell';
import { IconSettings } from './assets/settings';
import IconShapes from './assets/shapes';
import IconShrink from './assets/shrink';
import IconSignature from './assets/signature';
import IconSort from './assets/sort';
import IconSparkle from './assets/sparkle';
import { IconSpinner } from './assets/spinner';
import IconStar from './assets/star';
import IconStop from './assets/stop';
import IconStripe from './assets/stripe';
import IconSun from './assets/sun';
import IconTask from './assets/task';
import IconTaskPlus from './assets/task-plus';
import IconTaxes from './assets/taxes';
import IconTeam from './assets/team';
import { IconTestTube } from './assets/test-tube';
import { IconTrash } from './assets/trash';
import { IconTxt } from './assets/txt';
import { IconUpload } from './assets/upload';
import { IconUserGroup } from './assets/user-group';
import IconViewBottom from './assets/view-bottom';
import IconViewRight from './assets/view-right';
import IconWarehouse from './assets/warehouse';
import { IconWarning } from './assets/warning';
import { IconZip } from './assets/zip';


const iconMap: Record<TIconName, (props: IIconAsset) => JSX.Element> = {
  "2d":              Icon2D,
  "3d":              Icon3D,
  "account":         IconAccount,
  "add":             IconAdd,
  "alert-circle":    IconAlertCircle,
  "arrow":           IconArrow,
  "arrow-compare":   IconArrowCompare,
  "arrows-order":    IconArrowsOrder,
  "auction":         IconAuction,
  "auto-select":     IconAutoSelect,
  "award":           IconAward,
  "ban":             IconBan,
  "bank":            IconBank,
  "bell":            IconBell,
  "bid":             IconBid,
  "bids":            IconBids,
  "block":           IconBlock,
  "calculate":       IconCalculate,
  "calendar":        IconCalendar,
  "camera":          IconCamera,
  "camera-again":    IconCameraAgain,
  "camera-off":      IconCameraOff,
  "carrousel":       IconCarrousel,
  "cash":            IconCash,
  "changelog":       IconChangelog,
  "check":           IconCheck,
  "check-animated":  IconCheckAnimated,
  "check-circle":    IconCheckCircle,
  "check-double":    IconCheckDouble,
  "chevron":         IconChevron,
  "chevron-double":  IconChevronDouble,
  "chevron-down":    (props) => <IconChevron {...props} direction="down" />,
  "chevron-up":      (props) => <IconChevron {...props} direction="up" />,
  "chevron-left":    (props) => <IconChevron {...props} direction="left" />,
  "chevron-right":   (props) => <IconChevron {...props} direction="right" />,
  "cilinder":        IconCilinder,
  "clients":         IconClients,
  "close":           IconClose,
  "columns":         IconColumns,
  "contact":         IconContact,
  "copy":            IconCopy,
  "credit-card":     IconCreditCard,
  "csv":             IconCsv,
  "dashboard":       IconDashboard,
  "delivery":        IconDelivery,
  "delivery-truck":  IconDeliveryTruck,
  "diameter":        IconDiameter,
  "document":        IconDocument,
  "documents":       IconDocuments,
  "dollar-out":      IconDollarOut,
  "dots":            IconDots,
  "dots-more":       IconDotsMore,
  "download":        IconDownload,
  "drag":            IconDrag,
  "edit":            IconEdit,
  "email":           IconEmail,
  "error":           IconError,
  "euro":            IconEuro,
  "expand":          IconExpand,
  "export":          IconExport,
  "eye":             IconEye,
  "facebook":        IconFacebook,
  "file":            IconFile,
  "filters":         IconFilters,
  "first-item":      IconFirstItem,
  "flag":            IconFlag,
  "flag-country":    IconFlagCountry as (props: IIconAsset) => JSX.Element,
  "folder":          IconFolder,
  "generate":        IconGenerate,
  "graph":           IconGraph,
  "handshake":       IconHandshake,
  "heart":           IconHeart,
  "height":          IconHeight,
  "home":            IconHome,
  "image":           IconImage,
  "import":          IconImport,
  "info":            IconInfo,
  "info-circle":     IconInfoCircle,
  "insert":          IconInsert,
  "instagram":       IconInstagram,
  "invoice":         IconInvoice,
  "last-item":       IconLastItem,
  "layers":          IconLayers,
  "link-add":        IconLinkAdd,
  "list":            IconList,
  "lock-close":      (props) => <IconLock {...props} open={false} />,
  "lock-open":       (props) => <IconLock {...props} open={true} />,
  "login":           IconLogin,
  "logout":          IconLogout,
  "logs":            IconLogs,
  "mail":            IconMail,
  "mail-block":      IconMailBlock,
  "mail-failed":     IconMailFailed,
  "mail-sending":    IconMailSending,
  "mail-success":    IconMailSuccess,
  "menu":            IconMenu,
  "minus":           IconMinus,
  "money-slash":     IconMoneySlash,
  "moon":            IconMoon,
  "mp3":             IconMp3,
  "mp4":             IconMp4,
  "network":         IconNetwork,
  "no-results":      IconNoResults,
  "open":            IconOpen,
  "overview":        IconOverview,
  "package":         IconPackage,
  "payment-method":  IconPaymentMethod as (props: IIconAsset) => JSX.Element,
  "pdf":             IconPdf,
  "pencil":          IconPencil,
  "pending":         IconPending,
  "percentage":      IconPercentage,
  "person":          IconPerson,
  "phone":           IconPhone,
  "photos":          IconPhotos,
  "piggy-bank":      IconPiggyBank,
  "play":            IconPlay,
  "plugin":          IconPlugin,
  "plus":            IconPlus,
  "ppt":             IconPpt,
  "processing":      IconProcessing,
  "profile":         IconProfile,
  "qr":              IconQR,
  "receive-money":   IconReceiveMoney,
  "remove":          IconRemove,
  "remove-list":     IconRemoveFromList,
  "requests":        IconRequests,
  "reset":           IconReset,
  "retry":           IconRetry,
  "return":          IconReturn,
  "review":          IconReview,
  "running":         IconRunning,
  "search":          IconSearch,
  "search-remove":   IconSearchRemove,
  "select":          IconSelect,
  "sell":            IconSell,
  "settings":        IconSettings,
  "shapes":          IconShapes,
  "shrink":          IconShrink,
  "signature":       IconSignature,
  "sort":            IconSort,
  "sparkle":         IconSparkle,
  "spinner":         IconSpinner,
  "star":            IconStar,
  "stop":            IconStop,
  "stripe":          IconStripe,
  "sun":             IconSun,
  "task":            IconTask,
  "task-plus":       IconTaskPlus,
  "taxes":           IconTaxes,
  "team":            IconTeam,
  "test-tube":       IconTestTube,
  "trash":           IconTrash,
  "txt":             IconTxt,
  "upload":          IconUpload,
  "user-group":      IconUserGroup,
  "view-bottom":     IconViewBottom,
  "view-right":      IconViewRight,
  "warehouse":       IconWarehouse,
  "warning":         IconWarning,
  "zip":             IconZip,
};


export default function Icon({ name, ...props }: IIcon): JSX.Element {
  const IconComponent = iconMap[name];
  if (!IconComponent) return <></>;
  return <IconComponent {...props} />;
}
