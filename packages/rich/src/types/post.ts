export type Post = {
  /**
   * Title
   */
  title: string;
  /**
   * Content
   */
  content: string;
  /**
   * Slug
   */
  slug: string;
  /**
   * Url
   */
  url: string;
  /**
   * Id
   */
  id: number;
  /**
   * Excerpt
   */
  excerpt: string;
  /**
   * FeaturedImage
   */
  featuredImage: {
    /**
     * Url
     */
    url: string;
    /**
     * Width
     */
    width: number;
    /**
     * Height
     */
    height: number;
    /**
     * Alt
     */
    alt: string;
    [k: string]: unknown;
  };
  /**
   * Thumbnail
   */
  thumbnail: {
    /**
     * Url
     */
    url: string;
    /**
     * Width
     */
    width: number;
    /**
     * Height
     */
    height: number;
    /**
     * Alt
     */
    alt: string;
    [k: string]: unknown;
  };
  /**
   * Meta
   */
  meta: {
    /**
     * _edit_last
     */
    _edit_last: string;
    /**
     * _edit_lock
     */
    _edit_lock: string;
    [k: string]: unknown;
  };
  /**
   * Categories
   */
  categories: {
    /**
     * Name
     */
    name: string;
    /**
     * Url
     */
    url: string;
    /**
     * Id
     */
    id: number;
    /**
     * Slug
     */
    slug: string;
    /**
     * Description
     */
    description: string;
    /**
     * Count
     */
    count: number;
    [k: string]: unknown;
  }[];
  /**
   * Date
   */
  date: {
    /**
     * Formatted
     */
    formatted: string;
    /**
     * Display
     */
    display: string;
    /**
     * Modified
     */
    modified: string;
    /**
     * Modified_display
     */
    modified_display: string;
    /**
     * Timestamp
     */
    timestamp: number;
    /**
     * Year
     */
    year: string;
    /**
     * Month
     */
    month: string;
    /**
     * Day
     */
    day: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
};