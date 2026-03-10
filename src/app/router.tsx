import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { toolsConfig } from "@/config/tools";
import { Base64UrlEncodeDecodePage } from "@/features/base64-url-encode-decode/page";
import { ChangelogGeneratorPage } from "@/features/changelog-generator/page";
import { ClanNameGeneratorPage } from "@/features/clan-name-generator/page";
import { ClanTagGeneratorPage } from "@/features/clan-tag-generator/page";
import { ContentAngleGeneratorPage } from "@/features/content-angle-generator/page";
import { ColorPaletteContrastCheckerPage } from "@/features/color-palette-contrast-checker/page";
import { ColorPaletteGeneratorPage } from "@/features/color-palette-generator/page";
import { ContentCalendarGeneratorPage } from "@/features/content-calendar-generator/page";
import { CarouselOutlineGeneratorPage } from "@/features/carousel-outline-generator/page";
import { CrosshairStyleGeneratorPage } from "@/features/crosshair-style-generator/page";
import { CurlToFetchConverterPage } from "@/features/curl-to-fetch-converter/page";
import { DiscordChannelNameGeneratorPage } from "@/features/discord-channel-name-generator/page";
import { DiscordBotTemplateBasicPage } from "@/features/discord-bot-template-basic/page";
import { DiscordEmbedBuilderPage } from "@/features/discord-embed-builder/page";
import { DiscordEventAnnouncementGeneratorPage } from "@/features/discord-event-announcement-generator/page";
import { DiscordMarkdownFormatterPage } from "@/features/discord-markdown-formatter/page";
import { DiscordMessageSplitterPage } from "@/features/discord-message-splitter/page";
import { DiscordPollBuilderPage } from "@/features/discord-poll-builder/page";
import { DiscordReactionRoleBuilderPage } from "@/features/discord-reaction-role-builder/page";
import { DiscordRulesGeneratorPage } from "@/features/discord-rules-generator/page";
import { DiscordTimestampBuilderPage } from "@/features/discord-timestamp-builder/page";
import { DiscordUsernameGeneratorPage } from "@/features/discord-username-generator/page";
import { DiscordWelcomeMessageGeneratorPage } from "@/features/discord-welcome-message-generator/page";
import { DiscordServerIdeaGeneratorPage } from "@/features/discord-server-idea-generator/page";
import { FakeProfileGeneratorPage } from "@/features/fake-profile-generator/page";
import { GamerChallengeGeneratorPage } from "@/features/gamer-challenge-generator/page";
import { GamertagGeneratorPage } from "@/features/gamertag-generator/page";
import { HashtagGeneratorPage } from "@/features/hashtag-generator/page";
import { HookRemixLabPage } from "@/features/hook-remix-lab/page";
import { IdeaCombinatorPage } from "@/features/idea-combinator/page";
import { JsonFormatterPage } from "@/features/json-formatter/page";
import { JsonToTypescriptGeneratorPage } from "@/features/json-to-typescript-generator/page";
import { JwtDecoderInspectorPage } from "@/features/jwt-decoder-inspector/page";
import { LoremIpsumGeneratorPage } from "@/features/lorem-ipsum-generator/page";
import { LootDropSimulatorPage } from "@/features/loot-drop-simulator/page";
import { MinecraftNameGeneratorPage } from "@/features/minecraft-name-generator/page";
import { PasswordGeneratorPage } from "@/features/password-generator/page";
import { PixelArtGeneratorPage } from "@/features/pixel-art-generator/page";
import { PomodoroSessionPlannerPage } from "@/features/pomodoro-session-planner/page";
import { QuestNameGeneratorPage } from "@/features/quest-name-generator/page";
import { RandomWheelPickerPage } from "@/features/random-wheel-picker/page";
import { RegexTesterPage } from "@/features/regex-tester/page";
import { SocialCaptionGeneratorPage } from "@/features/social-caption-generator/page";
import { SpeedrunSplitPlannerPage } from "@/features/speedrun-split-planner/page";
import { SteamBioGeneratorPage } from "@/features/steam-bio-generator/page";
import { TextCaseConverterPage } from "@/features/text-case-converter/page";
import { TextGlitchGeneratorPage } from "@/features/text-glitch-generator/page";
import { ThumbnailTextAnalyzerPage } from "@/features/thumbnail-text-analyzer/page";
import { TimestampConverterPage } from "@/features/timestamp-converter/page";
import { ThumbnailBriefGeneratorPage } from "@/features/thumbnail-brief-generator/page";
import { UrlEncoderDecoderPage } from "@/features/url-encoder-decoder/page";
import { UnityAnimationcurvePresetGeneratorPage } from "@/features/unity-animationcurve-preset-generator/page";
import { UnityAssemblyDefinitionGeneratorPage } from "@/features/unity-assembly-definition-generator/page";
import { UnityBezierPathSamplerPage } from "@/features/unity-bezier-path-sampler/page";
import { UnityColorConverterPage } from "@/features/unity-color-converter/page";
import { UnityCsharpScriptGeneratorPage } from "@/features/unity-csharp-script-generator/page";
import { UnityFpsControllerScriptGeneratorPage } from "@/features/unity-fps-controller-script-generator/page";
import { UnityLayerCollisionMatrixHelperPage } from "@/features/unity-layer-collision-matrix-helper/page";
import { UnityLayermaskCalculatorPage } from "@/features/unity-layermask-calculator/page";
import { UnityNavmeshPatrolGeneratorPage } from "@/features/unity-navmesh-patrol-generator/page";
import { UnityObjectPoolPlannerPage } from "@/features/unity-object-pool-planner/page";
import { UnityPlayerprefsSnippetGeneratorPage } from "@/features/unity-playerprefs-snippet-generator/page";
import { UnityQuaternionEulerHelperPage } from "@/features/unity-quaternion-euler-helper/page";
import { UnityScriptableobjectTemplateGeneratorPage } from "@/features/unity-scriptableobject-template-generator/page";
import { UnityShaderKeywordHelperPage } from "@/features/unity-shader-keyword-helper/page";
import { UnityTagsEnumGeneratorPage } from "@/features/unity-tags-enum-generator/page";
import { UnityVector3ParserPage } from "@/features/unity-vector3-parser/page";
import { UuidNanoIdGeneratorPage } from "@/features/uuid-nanoid-generator/page";
import { VideoHookGeneratorPage } from "@/features/video-hook-generator/page";
import { VideoScriptTimerPage } from "@/features/video-script-timer/page";
import { WebhookTesterPage } from "@/features/webhook-tester/page";
import { YouTubeDescriptionGeneratorPage } from "@/features/youtube-description-generator/page";
import { YouTubeTitleGeneratorPage } from "@/features/youtube-title-generator/page";
import { LoadoutNameGeneratorPage } from "@/features/loadout-name-generator/page";
import { AboutPage } from "@/pages/AboutPage";
import { AllToolsPage } from "@/pages/AllToolsPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const toolPageBySlug = {
  "json-formatter": JsonFormatterPage,
  "regex-tester": RegexTesterPage,
  "json-to-typescript-generator": JsonToTypescriptGeneratorPage,
  "curl-to-fetch-converter": CurlToFetchConverterPage,
  "timestamp-converter": TimestampConverterPage,
  "base64-encoder-decoder": Base64UrlEncodeDecodePage,
  "url-encoder-decoder": UrlEncoderDecoderPage,
  "jwt-decoder-inspector": JwtDecoderInspectorPage,
  "uuid-generator": UuidNanoIdGeneratorPage,
  "discord-embed-builder": DiscordEmbedBuilderPage,
  "discord-timestamp-builder": DiscordTimestampBuilderPage,
  "discord-username-generator": DiscordUsernameGeneratorPage,
  "discord-markdown-formatter": DiscordMarkdownFormatterPage,
  "youtube-title-generator": YouTubeTitleGeneratorPage,
  "youtube-description-generator": YouTubeDescriptionGeneratorPage,
  "hashtag-generator": HashtagGeneratorPage,
  "gamertag-generator": GamertagGeneratorPage,
  "minecraft-name-generator": MinecraftNameGeneratorPage,
  "clan-name-generator": ClanNameGeneratorPage,
  "text-case-converter": TextCaseConverterPage,
  "lorem-ipsum-generator": LoremIpsumGeneratorPage,
  "password-generator": PasswordGeneratorPage,
  "color-palette-generator": ColorPaletteGeneratorPage,
  "color-palette-contrast-checker": ColorPaletteContrastCheckerPage,
  "thumbnail-text-analyzer": ThumbnailTextAnalyzerPage,
  "video-hook-generator": VideoHookGeneratorPage,
  "content-calendar-generator": ContentCalendarGeneratorPage,
  "social-caption-generator": SocialCaptionGeneratorPage,
  "webhook-tester": WebhookTesterPage,
  "changelog-generator": ChangelogGeneratorPage,
  "pixel-art-generator": PixelArtGeneratorPage,
  "discord-poll-builder": DiscordPollBuilderPage,
  "discord-rules-generator": DiscordRulesGeneratorPage,
  "discord-channel-name-generator": DiscordChannelNameGeneratorPage,
  "discord-bot-template-basic": DiscordBotTemplateBasicPage,
  "clan-tag-generator": ClanTagGeneratorPage,
  "loadout-name-generator": LoadoutNameGeneratorPage,
  "steam-bio-generator": SteamBioGeneratorPage,
  "discord-message-splitter": DiscordMessageSplitterPage,
  "discord-reaction-role-builder": DiscordReactionRoleBuilderPage,
  "discord-event-announcement-generator": DiscordEventAnnouncementGeneratorPage,
  "discord-welcome-message-generator": DiscordWelcomeMessageGeneratorPage,
  "discord-server-idea-generator": DiscordServerIdeaGeneratorPage,
  "gamer-challenge-generator": GamerChallengeGeneratorPage,
  "crosshair-style-generator": CrosshairStyleGeneratorPage,
  "quest-name-generator": QuestNameGeneratorPage,
  "speedrun-split-planner": SpeedrunSplitPlannerPage,
  "loot-drop-simulator": LootDropSimulatorPage,
  "video-script-timer": VideoScriptTimerPage,
  "carousel-outline-generator": CarouselOutlineGeneratorPage,
  "hook-remix-lab": HookRemixLabPage,
  "thumbnail-brief-generator": ThumbnailBriefGeneratorPage,
  "content-angle-generator": ContentAngleGeneratorPage,
  "fake-profile-generator": FakeProfileGeneratorPage,
  "text-glitch-generator": TextGlitchGeneratorPage,
  "pomodoro-session-planner": PomodoroSessionPlannerPage,
  "idea-combinator": IdeaCombinatorPage,
  "random-wheel-picker": RandomWheelPickerPage,
  "unity-csharp-script-generator": UnityCsharpScriptGeneratorPage,
  "unity-fps-controller-script-generator": UnityFpsControllerScriptGeneratorPage,
  "unity-playerprefs-snippet-generator": UnityPlayerprefsSnippetGeneratorPage,
  "unity-color-converter": UnityColorConverterPage,
  "unity-layermask-calculator": UnityLayermaskCalculatorPage,
  "unity-tags-enum-generator": UnityTagsEnumGeneratorPage,
  "unity-bezier-path-sampler": UnityBezierPathSamplerPage,
  "unity-quaternion-euler-helper": UnityQuaternionEulerHelperPage,
  "unity-vector3-parser": UnityVector3ParserPage,
  "unity-animationcurve-preset-generator": UnityAnimationcurvePresetGeneratorPage,
  "unity-shader-keyword-helper": UnityShaderKeywordHelperPage,
  "unity-scriptableobject-template-generator": UnityScriptableobjectTemplateGeneratorPage,
  "unity-object-pool-planner": UnityObjectPoolPlannerPage,
  "unity-navmesh-patrol-generator": UnityNavmeshPatrolGeneratorPage,
  "unity-layer-collision-matrix-helper": UnityLayerCollisionMatrixHelperPage,
  "unity-assembly-definition-generator": UnityAssemblyDefinitionGeneratorPage
} as const;

const toolRoutes = toolsConfig
  .map((tool) => {
    const Page = toolPageBySlug[tool.slug as keyof typeof toolPageBySlug];
    if (!Page) return null;
    return { path: tool.route.replace(/^\//, ""), element: <Page /> };
  })
  .filter((route): route is { path: string; element: JSX.Element } => route !== null);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "all-tools", element: <AllToolsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "category/:categorySlug", element: <CategoryPage /> },
      ...toolRoutes,
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);
